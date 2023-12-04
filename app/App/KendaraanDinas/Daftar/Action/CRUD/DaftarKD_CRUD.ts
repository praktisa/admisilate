import Connection from '@Connection';
import { READ_REGISTER_BY_NAMA_MOBIL } from '../../@modal/(.)peminjaman/[dk]/Action/Register_CRUD';

const Table: string = 'tb_kendaraandinas'

export async function Execute(QUERY: any) {

    let TABLE = !QUERY.TABLE ? Table : QUERY.TABLE
    let Q = ""

    const dbconnection = Connection()

    switch (QUERY.METHOD) {
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
        await dbconnection.promise().query('START TRANSACTION');

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


export async function CREATE_KENDARAAN_DINAS(Object_Data: any) {


    let QUERY = {
        "METHOD": "INSERT",
        "DATA": Object_Data
    }

    let hasil = await Execute(QUERY)

    return hasil
}

// membaca semua rencana kerja yang dibuat 
export async function READ_SEMUA_KENDARAAN_DINAS() {

    let QUERY = {
        "METHOD": "SELECT_ALL",
        "METHOD_QUERY": "ID, STR_NAMA, STR_IMG, OBJ_DATES_BOOKING",
    }

    let hasil = await Execute(QUERY)

    return hasil[0]
}

export async function READ_SEMUA_KENDARAAN_DINAS_ONLY_ID() {

    let QUERY = {
        "METHOD": "SELECT_ALL",
        "METHOD_QUERY": "ID",
    }

    let hasil = await Execute(QUERY)

    return hasil[0]
}

// membaca semua rencana kerja berdasarkan STR_ID_USER buat
export async function READ_KENDARAAN_DINAS_BY_ID(ID: string) {

    let QUERY = {
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID, STR_NAMA, DATE_SERVIS, OBJ_DATES_BOOKING",
        "WHERE": "ID = ?",
        "DATA": [ID]
    }

    let hasil = await Execute(QUERY)

    return hasil[0][0]
}

// mengedit rencana kerja berdasarkan ID pembuatan
// dibawah ini salah
// export async function UPDATE_KENDARAAN_DINAS_BY_PLAT(ID: string, TGL: any, TEMPAT: string, TUJUAN: string) {

//     let QUERY = {
//         "METHOD": "UPDATE",
//         "METHOD_QUERY": "STR_TGL = ?, STR_TEMPAT = ?, STR_TUJUAN = ?",
//         "WHERE": "ID = ?",
//         "DATA": [TGL, TEMPAT, TUJUAN, ID]
//     }

//     let hasil = await Execute(QUERY)

//     return hasil[0]
// }

export async function READ_OBJ_DATES_BOOKING_MOBIL_BY_ID(ID: string) {

    let QUERY = {
        "METHOD": "SELECT",
        "METHOD_QUERY": "OBJ_DATES_BOOKING",
        "WHERE": "ID = ?",
        "DATA": [ID]
    }

    let hasil = await Execute(QUERY)

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
        "METHOD": "UPDATE",
        "METHOD_QUERY": "OBJ_DATES_BOOKING = ?",
        "WHERE": "ID = ?",
        "DATA": [OBJ_DATES_BOOKING_AFTER, ID]
    }



    let hasil = await Execute(QUERY)

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
        "METHOD": "UPDATE",
        "METHOD_QUERY": "OBJ_DATES_BOOKING = ?",
        "WHERE": "ID = ?",
        "DATA": [JSON.stringify(DataMobil_OBJ_DATES), ID]
    }


    // console.log("DataMobil_OBJ_DATES", DataMobil_OBJ_DATES)
    // console.log("TGL_BEFORE", Parsed_TGL_BEFORE)
    // console.log("TGL_AFTER", Parsed_TGL_AFTER)
    // console.log("seksiPeminjam", seksiPeminjam)

    let asd = await Execute(QUERY)

    // console.log("UPDATE_OBJ_DATES_BOOKING_MOBIL_BY_ID", asd)

}


export async function UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_NAMA_MOBIL(
    NAMA_MOBIL: string
) {
    // harusnya BY ID Mobil
    let REGISTER_BY_NAMA = await READ_REGISTER_BY_NAMA_MOBIL(NAMA_MOBIL)

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
        "METHOD": "UPDATE",
        "METHOD_QUERY": "OBJ_DATES_BOOKING = ?",
        "WHERE": "STR_NAMA = ?",
        "DATA": [JSON.stringify(NEW_OBJ_DATES), NAMA_MOBIL]
    }


    let UpdateResult = await Execute(QUERY)

    return UpdateResult

    // console.log("UPDATE_OBJ_DATES_BOOKING_MOBIL_BY_ID", asd)

}



export async function DELETE_KENDARAAN_DINAS_BY_PLAT(ID: string) {

    let QUERY = {
        "METHOD": "DELETE",
        "WHERE": "ID = ?",
        "DATA": [ID]
    }

    let hasil = await Execute(QUERY)

    return hasil[0]
}


