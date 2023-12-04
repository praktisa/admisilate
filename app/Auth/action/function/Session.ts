
import Connection from '@Connection';
import { AmbilDataPegawaiDariJSONDirectory } from './function';

import { cookies } from 'next/headers'



import { redirect } from 'next/navigation';

const Table: string = 'tb_session'

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
    let result: any = await dbconnection.promise().query(Q, QUERY.DATA);
    dbconnection.end();

    return result
}


export async function CREATE_SESSION(Object_Data: any) {


    let QUERY = {
        "METHOD": "INSERT",
        "DATA": Object_Data
    }

    let hasil = await Execute(QUERY)

    return hasil
}


// membaca semua rencana kerja berdasarkan STR_ID_USER buat
export async function READ_NIP_BY_SESSION(SESSION: any) {

    let QUERY = {
        "METHOD": "SELECT",
        "METHOD_QUERY": "STR_NIP9",
        "WHERE": "STR_Session = ?",
        "DATA": [SESSION]
    }

    let hasil = await Execute(QUERY)

    return hasil[0][0]['STR_NIP9']
}

export async function READ_SERVER_SESSION() {

    let SessionCookie = cookies().get("session")?.value

    if (SessionCookie != undefined) {
        let NIP = await READ_NIP_BY_SESSION(SessionCookie)
        if (NIP != undefined) {

            let DataPegawai = await AmbilDataPegawaiDariJSONDirectory(NIP)

            let IP_KOTOR = DataPegawai['IP Sikka'] as string

            DataPegawai['IP Sikka'] = IP_KOTOR.replaceAll("'", "")

            return DataPegawai
        } else {
            return undefined
        }
    } else {

        return undefined
    }

}

// mengedit rencana kerja berdasarkan ID pembuatan
export async function UPDATE_SESSSION(ID: string, TGL: any, TEMPAT: string, TUJUAN: string) {

    let QUERY = {
        "METHOD": "UPDATE",
        "METHOD_QUERY": "STR_TGL = ?, STR_TEMPAT = ?, STR_TUJUAN = ?",
        "WHERE": "ID = ?",
        "DATA": [TGL, TEMPAT, TUJUAN, ID]
    }

    let hasil = await Execute(QUERY)

    return hasil[0]
}



export async function DELETE_SESSION(ID: string) {

    let QUERY = {
        "METHOD": "DELETE",
        "WHERE": "ID = ?",
        "DATA": [ID]
    }

    let hasil = await Execute(QUERY)

    return hasil[0]
}





export async function CREATE_Session(NIP: string, Token_NIP: string) {
    let QuerySelect = `INSERT INTO ${Table} SET ?`
    let ValueAdd = { "STR_Session": Token_NIP, "STR_NIP9": NIP }

    const dbconnection = Connection()
    await dbconnection.promise().query(QuerySelect, ValueAdd);
    dbconnection.end();
}

export async function READ_Session(NIP: string) {

    const dbconnection = Connection()
    let Query = `SELECT COUNT(*) FROM ${Table} WHERE STR_NIP9 = ?`
    let result: any = await dbconnection.promise().query(Query, [NIP]);
    dbconnection.end();

    return result[0][0]['COUNT(*)']
}


export async function READ_NIPBySession(Session: any) {



    const dbconnection = Connection()
    let Query = `SELECT STR_NIP9 FROM ${Table} WHERE STR_Session = ?`
    let result: any = await dbconnection.promise().query(Query, [Session]);
    dbconnection.end();

    let NIP = result[0][0]['STR_NIP9']

    if (!result[0][0]['STR_NIP9']) {
        redirect("/Auth")
    }

    return NIP
}

export async function READ_UserBySessionRequest(request: any) {

    const Session = request.headers.get('authentication')

    try {
        const dbconnection = Connection()
        let Query = `SELECT STR_NIP9 FROM ${Table} WHERE STR_Session = ?`
        let result: any = await dbconnection.promise().query(Query, [Session]);
        dbconnection.end();

        let DataPegawai = AmbilDataPegawaiDariJSONDirectory(result[0][0]['STR_NIP9'])

        return DataPegawai
    } catch (error) {

        redirect('/Auth')
    }

}

// export default async function FETCH_READ_UserBySession() {

//     let URL = `http://0.0.0.0:3000/Auth/api/Login`
//     let res = await GET(URL, true)

//     return res.user
// }


export async function DELETE_Session(NIP: string) {
    let QueryDELETE = `DELETE FROM ${Table} WHERE ?`
    let ValueDELETE = { "STR_NIP9": NIP }

    const dbconnection = Connection()
    await dbconnection.promise().query(QueryDELETE, ValueDELETE);
    dbconnection.end();
}

