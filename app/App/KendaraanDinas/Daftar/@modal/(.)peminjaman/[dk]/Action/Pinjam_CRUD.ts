

import Connection from '@Connection';
import { INSERT_OBJ_DATES_BOOKING_MOBIL_BY_ID } from '../../../../Action/CRUD/DaftarKD_CRUD';


const Table: string = 'tb_kendaraandinas_status'

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

    // console.log("Q Q Q", Q, QUERY)

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


export async function CREATE_PINJAM__MOBIL(Object_Data: any) {

    // berfungsi untuk menambahkan saja tetapi tidak menggunakan UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL agar tidak berat
    let TGL_IN_DATABASE_UPDATE = await INSERT_OBJ_DATES_BOOKING_MOBIL_BY_ID(
        Object_Data.STR_ID_KENDARAAN,
        Object_Data.STR_TGL,
        Object_Data.STR_PEMINJAM
    )


    let QUERY = {
        "METHOD": "INSERT",
        "DATA": Object_Data
    }

    let hasil = await Execute(QUERY)

    // console.log("UPDATEEEE", Update)

    return hasil[0].insertId
}

export async function UPDATE_KENDARAAN_DINAS_BY_ID_PINJAM(ID: string, TGL: any, TEMPAT: string, TUJUAN: string) {

    let QUERY = {
        "METHOD": "UPDATE",
        "METHOD_QUERY": "STR_TGL = ?, STR_TEMPAT = ?, STR_TUJUAN = ?",
        "WHERE": "ID_STATUS = ?",
        "DATA": [TGL, TEMPAT, TUJUAN, ID]
    }

    let hasil = await Execute(QUERY)

    return hasil[0]
}