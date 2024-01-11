import { Execute_KendaraanDinas } from './executor_KendaraanDinas';
import { READ_REGISTER_BY_ID_MOBIL } from './schema_tb_kendaraan_register';


const Table: string = 'tb_kendaraandinas'



export async function CREATE_KENDARAAN_DINAS(Object_Data: any) {


    let QUERY = {
        "TABLE": Table,
        "METHOD": "INSERT",
        "DATA": Object_Data
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil
}

// membaca semua rencana kerja yang dibuat 
export async function READ_SEMUA_KENDARAAN_DINAS() {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT_ALL",
        "METHOD_QUERY": "ID, STR_NAMA, STR_JENIS",
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
}

export async function READ_SEMUA_OBJ_DATES_BOOKING() {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT_ALL",
        "METHOD_QUERY": "ID, OBJ_DATES_BOOKING",
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
}

export async function READ_SEMUA_IMG() {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT_ALL",
        "METHOD_QUERY": "ID, BLOB_IMG",
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
}





export async function READ_SEMUA_KENDARAAN_DINAS_ONLY_ID() {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT_ALL",
        "METHOD_QUERY": "ID",
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
}

// membaca semua rencana kerja berdasarkan STR_ID_USER buat
export async function READ_KENDARAAN_DINAS_BY_ID(ID: string) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID, STR_NAMA, STR_PLAT ,OBJ_DATES_BOOKING, STR_JENIS",
        "WHERE": "ID = ?",
        "DATA": [ID]
    }
    // pisah OBJ_DATES_BOOKING
    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0][0]
}

export async function READ_BLOB_IMG_BY_ID(ID: string) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID, BLOB_IMG",
        "WHERE": "ID = ?",
        "DATA": [ID]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0][0]
}





export async function READ_OBJ_DATES_BOOKING_MOBIL_BY_ID(ID: string) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT",
        "METHOD_QUERY": "OBJ_DATES_BOOKING",
        "WHERE": "ID = ?",
        "DATA": [ID]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0][0]['OBJ_DATES_BOOKING']
}

export async function INSERT_OBJ_DATES_BOOKING_MOBIL_BY_ID(
    ID: string, TGL: any, seksiPeminjam: string
) {

    let OBJ_DATES_BOOKING_BEFORE = await READ_OBJ_DATES_BOOKING_MOBIL_BY_ID(ID)

    // console.log("OBJ_DATES_BOOKING_BEFORE", typeof OBJ_DATES_BOOKING_BEFORE)

    let USED_OBJ_DATES_BOOKING_BEFORE = {}

    if (OBJ_DATES_BOOKING_BEFORE === "") {
        USED_OBJ_DATES_BOOKING_BEFORE = {}
    } else {
        USED_OBJ_DATES_BOOKING_BEFORE = JSON.parse(OBJ_DATES_BOOKING_BEFORE)
    }



    let TGL_PARSE = JSON.parse(TGL)

    for (var i = 0; i < TGL_PARSE.length; i++) {

        Object.assign(USED_OBJ_DATES_BOOKING_BEFORE, { [TGL_PARSE[i]]: seksiPeminjam })
    }

    let OBJ_DATES_BOOKING_AFTER = JSON.stringify(USED_OBJ_DATES_BOOKING_BEFORE)

    let QUERY = {
        "TABLE": Table,
        "METHOD": "UPDATE",
        "METHOD_QUERY": "OBJ_DATES_BOOKING = ?",
        "WHERE": "ID = ?",
        "DATA": [OBJ_DATES_BOOKING_AFTER, ID]
    }



    let hasil = await Execute_KendaraanDinas(QUERY)

    return OBJ_DATES_BOOKING_AFTER
}

export async function UPDATE_OBJ_DATES_BOOKING_MOBIL_BY_ID(
    ID: string, TGL_BEFORE: any, TGL_AFTER: any, seksiPeminjam: string
) {

    let DataMobil_OBJ_DATES = JSON.parse(await READ_OBJ_DATES_BOOKING_MOBIL_BY_ID(ID))
    let Parsed_TGL_BEFORE = JSON.parse(TGL_BEFORE)
    let Parsed_TGL_AFTER = JSON.parse(TGL_AFTER)

    for (var i = 0; i < Parsed_TGL_BEFORE.length; i++) {

        delete DataMobil_OBJ_DATES[Parsed_TGL_BEFORE[i]]

    }

    for (var i = 0; i < Parsed_TGL_AFTER.length; i++) {

        let CreateNew_OBJ_DATES = {
            [Parsed_TGL_AFTER[i]]: seksiPeminjam
        }
        Object.assign(DataMobil_OBJ_DATES, CreateNew_OBJ_DATES)
    }

    let QUERY = {
        "TABLE": Table,
        "METHOD": "UPDATE",
        "METHOD_QUERY": "OBJ_DATES_BOOKING = ?",
        "WHERE": "ID = ?",
        "DATA": [JSON.stringify(DataMobil_OBJ_DATES), ID]
    }

    let asd = await Execute_KendaraanDinas(QUERY)

}


export async function UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL(
    ID_MOBIL: string
) {
    // harusnya BY ID Mobil
    let REGISTER_BY_NAMA = await READ_REGISTER_BY_ID_MOBIL(ID_MOBIL)

    // console.log("REGISTER_BY_NAMA", REGISTER_BY_NAMA.length, REGISTER_BY_NAMA)

    let NEW_OBJ_DATES = {}

    if (REGISTER_BY_NAMA.length > 0) {
        for (var i = 0; i < REGISTER_BY_NAMA.length; i++) {

            console.log("CREATE NEW", REGISTER_BY_NAMA[i])

            let date = new Date(REGISTER_BY_NAMA[i]['STR_DATE'])
            let InsertDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

            Object.assign(NEW_OBJ_DATES, {
                [InsertDate]: REGISTER_BY_NAMA[i]['STR_PEMINJAM']
            })
        }
    }


    let QUERY = {
        "TABLE": Table,
        "METHOD": "UPDATE",
        "METHOD_QUERY": "OBJ_DATES_BOOKING = ?",
        "WHERE": "ID = ?",
        "DATA": [JSON.stringify(NEW_OBJ_DATES), ID_MOBIL]
    }


    let UpdateResult = await Execute_KendaraanDinas(QUERY)

    return UpdateResult

    // console.log("UPDATE_OBJ_DATES_BOOKING_MOBIL_BY_ID", asd)

}



export async function DELETE_KENDARAAN_DINAS_BY_ID(ID: string) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "DELETE",
        "WHERE": "ID = ?",
        "DATA": [ID]
    }

    try {
        await Execute_KendaraanDinas(QUERY)

        return "Berhasil"
    } catch (error) {
        return "Failed"
    }

}




export async function ADMIN_READ_SEMUA_KENDARAAN_DINAS() {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT_ALL",
        "METHOD_QUERY": "ID, STR_NAMA, STR_PLAT,  BLOB_IMG, STR_JENIS",

    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return JSON.stringify(hasil[0])
}

export async function ADMIN_UPDATE_KENDARAAN_DINAS_BY_ID(Data: any) {

    const { ID_LAMA, ID, STR_NAMA, STR_PLAT, BLOB_IMG, STR_JENIS } = Data

    let QUERY = {}

    let CheckImg = JSON.parse(JSON.stringify(BLOB_IMG))

    if (CheckImg.data.length != 0) {
        QUERY = {
            "TABLE": Table,
            "METHOD": "UPDATE",
            "METHOD_QUERY": "ID = ?, STR_NAMA = ?, STR_PLAT = ?, BLOB_IMG= ?, STR_JENIS= ?",
            "WHERE": "ID = ?",
            "DATA": [ID, STR_NAMA, STR_PLAT, BLOB_IMG, STR_JENIS, ID_LAMA]
        }

    } else {
        QUERY = {
            "TABLE": Table,
            "METHOD": "UPDATE",
            "METHOD_QUERY": "ID = ?, STR_NAMA = ?, STR_PLAT = ?, STR_JENIS= ?",
            "WHERE": "ID = ?",
            "DATA": [ID, STR_NAMA, STR_PLAT, STR_JENIS, ID_LAMA]
        }
    }



    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil

}

export async function ADMIN_READ_KENDARAAN_DINAS_BY_ID(ID: string) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID, STR_NAMA, STR_PLAT, BLOB_IMG, STR_JENIS",
        "WHERE": "ID = ?",
        "DATA": [ID]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    // console.log("ADMIN_READ_KENDARAAN_DINAS_BY_ID", hasil)

    if (hasil[0].length != 0) {
        return hasil[0][0]
    } else {
        return 0
    }


}