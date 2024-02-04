import { Execute_KendaraanDinas } from './executor_KendaraanDinas';
import { READ_SEMUA_KENDARAAN_DINAS } from './schema_tb_kendaraan';

const Table: string = 'tb_kendaraandinas_register'



export async function CEK_REGISTER(Array_Date: string[], STR_ID_Kendaraan: string) {

    let Tersedia: string[] = []
    let Tidak_Tersedia: string[] = []

    for (var i = 0; i < Array_Date.length; i++) {
        let QUERY = {
            "TABLE": Table,
            "METHOD": "CHECK",
            "WHERE": "STR_DATE = ? AND STR_ID_KENDARAAN = ?",
            "DATA": [Array_Date[i], STR_ID_Kendaraan]
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

export async function CEK_REGISTER_BY_ONLY_DATE(Array_Date: string[]) {

    let Terpinjam = {}
    let SemuaMobil = []

    for (var i = 0; i < Array_Date.length; i++) {
        // console.log("Mengambil tanggal ", Array_Date)
        let QUERY = {
            "TABLE": Table,
            "METHOD": "SELECT",
            "METHOD_QUERY": "STR_ID_KENDARAAN, STR_DATE, STR_NAMA_KENDARAAN",
            "WHERE": "STR_DATE = ?",
            "DATA": [Array_Date[i]]
        }

        let hasil = await Execute_KendaraanDinas(QUERY)

        for (var o = 0; o < hasil[0].length; o++) {
            SemuaMobil.push(hasil[0][o])
        }


        let GroupDate = { [Array_Date[i]]: hasil[0] }

        Object.assign(Terpinjam, GroupDate)
    }
    Object.assign(Terpinjam, { "Semua": SemuaMobil })

    // console.log("Terpinjam", Terpinjam)

    return Terpinjam
}


export async function READ_REGISTER_BY_ID_MOBIL(STR_ID_KENDARAAN: string) {

    let HariIni = new Date()
    HariIni.setHours(10)
    let STR_HariIni = HariIni.toISOString().split("T")[0] as string

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID, STR_DATE, STR_PEMINJAM",
        "WHERE": `STR_ID_KENDARAAN = ? AND STR_DATE >= ? `, // harusnya PLAT MOBIL
        "DATA": [STR_ID_KENDARAAN, STR_HariIni]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
}


// upgrade register sur, masukan ID kendaraan juga agar kendaraan dengan nama yang sama terhindar !!!!!!!
export async function READ_REGISTER_FOR_ALTERNATE_KENDARAAN_DINAS_AVAILABILITY(string_date_target: string) {

    let array_date_target = string_date_target.split(",")

    let Array_Semua_Kendaraan = await READ_SEMUA_KENDARAAN_DINAS()

    let Array_Date_Register_Terpinjam: any = await CEK_REGISTER_BY_ONLY_DATE(array_date_target)


    function getDifference(array1: any, array2: any) {
        return array1.filter((object1: any) => {
            return !array2.some((object2: any) => {
                return object1.ID === object2.STR_ID_KENDARAAN;
            });
        });
    }

    let Returned_Object = {}

    let SemuaMobil_Tersedia = getDifference(Array_Semua_Kendaraan, Array_Date_Register_Terpinjam['Semua'])

    Object.assign(Returned_Object, { "Semua": SemuaMobil_Tersedia })


    for (var i = 0; i < array_date_target.length; i++) {
        let DataPertanggal = Array_Date_Register_Terpinjam[array_date_target[i]]
        let Difference = getDifference(Array_Semua_Kendaraan, DataPertanggal)

        Object.assign(Returned_Object, { [array_date_target[i]]: Difference })
    }



    // console.log("Array_Semua_Kendaraan", Array_Semua_Kendaraan)
    // console.log("Array_Date_Register_Terpinjam", Array_Date_Register_Terpinjam)
    // console.log("NewDate", Returned_Object)


    return Returned_Object

}

export async function CREATE_REGISTER(ID_STATUS: number, STR_ID_KENDARAAN: string, STR_NAMA_KENDARAAN: string, Array_Date: string[], STR_PEMINJAM: string) {

    for (var i = 0; i < Array_Date.length; i++) {
        let Object = {
            "ID_STATUS": ID_STATUS,
            "STR_DATE": Array_Date[i],
            "STR_ID_KENDARAAN": STR_ID_KENDARAAN,
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

        DATE.setHours(10)

        let STR = DATE.toISOString().split("T")[0] as string

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


