
import { INSERT_OBJ_DATES_BOOKING_MOBIL_BY_ID } from '@/app/App/KendaraanDinas/@DaftarKendaraanDinas/Action/CRUD/DaftarKD_CRUD';
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
            Q = `SELECT ${QUERY.METHOD_QUERY} FROM ${TABLE}`
            break;

        case "SELECT":
            Q = `SELECT ${QUERY.METHOD_QUERY} FROM ${TABLE} WHERE ${QUERY.WHERE}`
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

    let QUERY = {
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID, STR_DATE, STR_PEMINJAM",
        "WHERE": "STR_NAMA_KENDARAAN = ?", // harusnya PLAT MOBIL
        "DATA": [STR_Nama_Kendaraan]
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
            "STR_PEMINJAM": STR_PEMINJAM
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

    console.log("UPDATE_REGISTER REGISTER_AWAL ", REGISTER_AWAL)


    for (var i = 0; i < REGISTER_AWAL.length; i++) {
        let TARGET_DELETE_DATE_AWAL = Array_Date_After.includes(REGISTER_AWAL[i]['STR_DATE'])

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