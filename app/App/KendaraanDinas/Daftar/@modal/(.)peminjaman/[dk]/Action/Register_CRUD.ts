

import Connection from '@Connection';


const Table: string = 'tb_kendaraandinas_register'

export async function Execute(QUERY: any) {

    let TABLE = !QUERY.TABLE ? Table : QUERY.TABLE
    let Q = ""

    const dbconnection = Connection()

    switch (QUERY.METHOD) {

        case "CHECK":
            Q = `SELECT COUNT(1) FROM ${TABLE} WHERE ${QUERY.WHERE}`
            break;

        case "INSERT":
            Q = `INSERT INTO ${TABLE} SET ?`
            break;

        case "SELECT_ALL":
            Q = `SELECT ${QUERY.METHOD_QUERY} FROM ${TABLE} `
            break;

        case "SELECT":
            Q = `SELECT ${QUERY.METHOD_QUERY} FROM ${TABLE} WHERE ${QUERY.WHERE}`
            break;

        case "SELECT_LEFT_JOIN":
            Q = `SELECT ${QUERY.METHOD_QUERY} FROM ${TABLE} LEFT JOIN ${QUERY.LEFT_JOIN_TABLE} ON ${QUERY.ON} WHERE ${QUERY.WHERE}`
            break;

        case "UPDATE":
            Q = `UPDATE ${TABLE} SET ${QUERY.METHOD_QUERY} WHERE ${QUERY.WHERE}`

            break;

        case "DELETE":
            Q = `DELETE FROM ${TABLE} WHERE ${QUERY.WHERE}`
            break;

        default:
            return { Error: "Method Not Found" }
    }

    console.log("Q Q Q", Q, QUERY)

    try {
        console.log("TRANSACTION BEGIN")
        let Commmin = await dbconnection.promise().query('START TRANSACTION');

        let result: any = await dbconnection.promise().query(Q, QUERY.DATA);

        await dbconnection.promise().commit()
        dbconnection.end();

        console.log("TRANSACTION SUCCESS")
        return result

    } catch (e) {
        console.log("TRANSACTION ERROR", e)
        await dbconnection.promise().query('ROLLBACK');
        dbconnection.end();
        return e
    }


}


export async function CEK_REGISTER(Array_Date: string[], STR_Nama_Kendaraan: string) {

    let Tersedia: string[] = []
    let Tidak_Tersedia: string[] = []

    for (var i = 0; i < Array_Date.length; i++) {
        let QUERY = {
            "METHOD": "CHECK",
            "WHERE": "STR_DATE = ? AND STR_NAMA_KENDARAAN = ?",
            "DATA": [Array_Date[i], STR_Nama_Kendaraan]
        }

        let hasil = await Execute(QUERY)


        let Availability = hasil[0][0]['COUNT(1)']
        if (Availability === 0) {
            Tersedia.push(Array_Date[i])
        } else if (Availability > 0) {
            Tidak_Tersedia.push(Array_Date[i])
        }
    }

    return { "0": Tersedia, "1": Tidak_Tersedia }
}


export async function READ_REGISTER_BY_NAMA_MOBIL(STR_Nama_Kendaraan: string) {

    let HariIni = new Date()
    let STR_HariIni = `${HariIni.getFullYear()}-${HariIni.getMonth() + 1}-${HariIni.getDate()}`

    let QUERY = {
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID, STR_DATE, STR_PEMINJAM",
        "WHERE": `STR_NAMA_KENDARAAN = ? AND STR_DATE >= ? `, // harusnya PLAT MOBIL
        "DATA": [STR_Nama_Kendaraan, STR_HariIni]
    }

    let hasil = await Execute(QUERY)

    return hasil[0]
}

export async function CREATE_REGISTER(ID_STATUS: number, STR_NAMA_KENDARAAN: string, Array_Date: string[], STR_PEMINJAM: string) {

    for (var i = 0; i < Array_Date.length; i++) {
        let Object = {
            "ID_STATUS": ID_STATUS,
            "STR_DATE": Array_Date[i],
            "STR_NAMA_KENDARAAN": STR_NAMA_KENDARAAN,
            "STR_PEMINJAM": STR_PEMINJAM,

        }

        let QUERY = {
            "METHOD": "INSERT",
            "DATA": Object
        }

        await Execute(QUERY)
    }

}
// UPDATE berfungsi untuk menghapus tanggal yang tidak sesuai dengan ekspektasi
export async function UPDATE_REGISTER(ID_STATUS: number, Array_Date_After: string[]) {

    let QUERY = {
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID, STR_DATE",
        "WHERE": "ID_STATUS = ?",
        "DATA": [ID_STATUS]
    }

    let REGISTER_AWAL = (await Execute(QUERY))[0]

    console.log("Array_Date_After", Array_Date_After)
    console.log("UPDATE_REGISTER REGISTER_AWAL ", REGISTER_AWAL)

    for (var i = 0; i < REGISTER_AWAL.length; i++) {

        let DATE = new Date(REGISTER_AWAL[i]['STR_DATE'])

        let TGL = DATE.getDate()
        let BLN = DATE.getMonth() + 1
        let THN = DATE.getFullYear()

        let STR = `${THN}-${BLN}-${TGL}`

        let TARGET_DELETE_DATE_AWAL = Array_Date_After.includes(STR)

        if (!TARGET_DELETE_DATE_AWAL) {
            await DELETE_REGISTER(REGISTER_AWAL[i]['ID'])
        }
    }


}


export async function DELETE_REGISTER(ID_REGISTER: string) {

    let QUERY = {
        "METHOD": "DELETE",
        "WHERE": "ID = ?",
        "DATA": [ID_REGISTER]
    }

    let hasil = await Execute(QUERY)

    console.log("DELETE_REGISTER", hasil)

    return hasil[0]
}


export async function ADMIN_READ_ALL_REGISTER(comparison: string) {

    let HariIni = new Date()
    let STR_HariIni = `${HariIni.getFullYear()}-${HariIni.getMonth() + 1}-${HariIni.getDate()}`

    // console.log("HariIni dan JSON toDateString", HariIni)



    let QUERY = {
        "METHOD": "SELECT_LEFT_JOIN",
        "METHOD_QUERY": `${Table}.ID, ${Table}.ID_STATUS, ${Table}.STR_NAMA_KENDARAAN, ${Table}.STR_DATE, ${Table}.STR_PEMINJAM, tb_kendaraandinas_status.STR_TUJUAN, tb_kendaraandinas_status.ID_STATUS,  tb_kendaraandinas_status.STR_APPROVE`,
        "LEFT_JOIN_TABLE": `tb_kendaraandinas_status`,
        "ON": `${Table}.ID_STATUS = tb_kendaraandinas_status.ID_STATUS`,
        "WHERE": `${Table}.STR_DATE ${comparison} ? ORDER BY ${Table}.STR_DATE`,
        "DATA": [STR_HariIni]
    }

    let hasil = await Execute(QUERY)

    // console.log("ADMIN_READ_REGISTER_HARI_INI", hasil)

    return hasil[0]
}

export async function ADMIN_UPDATE_AMBIL_ALIH_REGISTER(ID_REGISTER: string, ID_STATUS_BARU: string, STR_PEMINJAM: string) {

    // Ubah data Register (ID_STATUS) berdasarkan ID_REGISTER

    // Recreate Register

    let QUERY = {
        "METHOD": "UPDATE",
        "METHOD_QUERY": "ID_STATUS = ?, STR_PEMINJAM = ?",
        "WHERE": "ID = ?",
        "DATA": [ID_STATUS_BARU, STR_PEMINJAM, ID_REGISTER]
    }

    let hasil = await Execute(QUERY)

    return hasil[0]
    // pertimbangkan untuk membuat ambil alih seperti booking biasa

    // return hasil[0]
}

export async function ADMIN_UPDATE_KEMBALIKAN_REGISTER(ID_REGISTER: string, ID_STATUS: string, STR_PEMINJAM_AWAL: string) {

    // Ubah data Register (ID_STATUS) berdasarkan ID_REGISTER

    // Recreate Register

    let QUERY = {
        "METHOD": "UPDATE",
        "METHOD_QUERY": "ID_STATUS = ?, STR_PEMINJAM = ?",
        "WHERE": "ID = ?",
        "DATA": [ID_STATUS, STR_PEMINJAM_AWAL, ID_REGISTER]
    }

    let hasil = await Execute(QUERY)

    // console.log("ADMIN_UPDATE_KEMBALIKAN_REGISTER", hasil)

    return hasil[0].affectedRows


}


