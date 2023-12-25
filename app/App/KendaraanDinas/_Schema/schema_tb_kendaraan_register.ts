import { Execute_KendaraanDinas } from './executor_KendaraanDinas';

const Table: string = 'tb_kendaraandinas_register'



export async function CEK_REGISTER(Array_Date: string[], STR_Nama_Kendaraan: string) {

    let Tersedia: string[] = []
    let Tidak_Tersedia: string[] = []

    for (var i = 0; i < Array_Date.length; i++) {
        let QUERY = {
            "TABLE": Table,
            "METHOD": "CHECK",
            "WHERE": "STR_DATE = ? AND STR_NAMA_KENDARAAN = ?",
            "DATA": [Array_Date[i], STR_Nama_Kendaraan]
        }

        let hasil = await Execute_KendaraanDinas(QUERY)


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
        "TABLE": Table,
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID, STR_DATE, STR_PEMINJAM",
        "WHERE": `STR_NAMA_KENDARAAN = ? AND STR_DATE >= ? `, // harusnya PLAT MOBIL
        "DATA": [STR_Nama_Kendaraan, STR_HariIni]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

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
            "TABLE": Table,
            "METHOD": "INSERT",
            "DATA": Object
        }

        await Execute_KendaraanDinas(QUERY)
    }

}
// UPDATE berfungsi untuk menghapus tanggal yang tidak sesuai dengan ekspektasi
export async function UPDATE_REGISTER(ID_STATUS: number, Array_Date_After: string[]) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID, STR_DATE",
        "WHERE": "ID_STATUS = ?",
        "DATA": [ID_STATUS]
    }

    let REGISTER_AWAL = (await Execute_KendaraanDinas(QUERY))[0]

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
        "TABLE": Table,
        "METHOD": "DELETE",
        "WHERE": "ID = ?",
        "DATA": [ID_REGISTER]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    console.log("DELETE_REGISTER", hasil)

    return hasil[0]
}


export async function ADMIN_READ_ALL_REGISTER(comparison: string) {

    let HariIni = new Date()
    let STR_HariIni = `${HariIni.getFullYear()}-${HariIni.getMonth() + 1}-${HariIni.getDate()}`

    // console.log("HariIni dan JSON toDateString", HariIni)



    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT_LEFT_JOIN",
        "METHOD_QUERY": `${Table}.ID, ${Table}.ID_STATUS, ${Table}.STR_NAMA_KENDARAAN, ${Table}.STR_DATE, ${Table}.STR_PEMINJAM, tb_kendaraandinas_status.STR_TUJUAN, tb_kendaraandinas_status.ID_STATUS,  tb_kendaraandinas_status.STR_APPROVE`,
        "LEFT_JOIN_TABLE": `tb_kendaraandinas_status`,
        "ON": `${Table}.ID_STATUS = tb_kendaraandinas_status.ID_STATUS`,
        "WHERE": `${Table}.STR_DATE ${comparison} ? ORDER BY ${Table}.STR_DATE`,
        "DATA": [STR_HariIni]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    // console.log("ADMIN_READ_REGISTER_HARI_INI", hasil)

    return hasil[0]
}

export async function ADMIN_UPDATE_AMBIL_ALIH_REGISTER(ID_REGISTER: string, ID_STATUS_BARU: string, STR_PEMINJAM: string) {

    // Ubah data Register (ID_STATUS) berdasarkan ID_REGISTER

    // Recreate Register

    let QUERY = {
        "TABLE": Table,
        "METHOD": "UPDATE",
        "METHOD_QUERY": "ID_STATUS = ?, STR_PEMINJAM = ?",
        "WHERE": "ID = ?",
        "DATA": [ID_STATUS_BARU, STR_PEMINJAM, ID_REGISTER]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
    // pertimbangkan untuk membuat ambil alih seperti booking biasa

    // return hasil[0]
}

export async function ADMIN_UPDATE_KEMBALIKAN_REGISTER(ID_REGISTER: string, ID_STATUS: string, STR_PEMINJAM_AWAL: string) {

    // Ubah data Register (ID_STATUS) berdasarkan ID_REGISTER

    // Recreate Register

    let QUERY = {
        "TABLE": Table,
        "METHOD": "UPDATE",
        "METHOD_QUERY": "ID_STATUS = ?, STR_PEMINJAM = ?",
        "WHERE": "ID = ?",
        "DATA": [ID_STATUS, STR_PEMINJAM_AWAL, ID_REGISTER]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    // console.log("ADMIN_UPDATE_KEMBALIKAN_REGISTER", hasil)

    return hasil[0].affectedRows


}


