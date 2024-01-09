'use server'
import { cookies } from 'next/headers'
import Connection from '@Connection';
import { AmbilDataPegawaiDariJSONDirectory, MasaCookie } from './function';

import { setCookie } from 'cookies-next';


import { redirect } from 'next/navigation';
import { CreateCookies } from '../CreateCookies';
import FETCH_POST_CREATE_COOKIE from '../api/POST_CREATE_COOKIE/FETCH_POST_CREATE_COOKIE';

const Table: string = 'tb_session'

export async function Execute(QUERY: any) {

    let TABLE = !QUERY.TABLE ? Table : QUERY.TABLE
    let Q = ""

    const dbconnection = Connection()

    switch (QUERY.METHOD) {
        case "CHECK":
            Q = `SELECT COUNT(*) FROM ${TABLE} WHERE ${QUERY.WHERE}`
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

    try {
        console.log("START TRANSACTION BEGIN")
        await dbconnection.promise().query('START TRANSACTION');

        let result: any = await dbconnection.promise().query(Q, QUERY.DATA);

        await dbconnection.promise().commit().then(() => {
            dbconnection.end();
            console.log("TRANSACTION SUCCESS")
        })

        return result

    } catch (e) {
        console.log("TRANSACTION ERROR", e)
        await dbconnection.promise().query('ROLLBACK');
        dbconnection.end();
        return e
    }
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
export async function CEK_NIP_BY_SESSION(SESSION: any) {

    let QUERY = {
        "METHOD": "CHECK",
        "METHOD_QUERY": "STR_NIP9",
        "WHERE": "STR_Session = ?",
        "DATA": [SESSION]
    }

    let hasil = await Execute(QUERY)

    return hasil[0][0]['COUNT(1)']
}

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

// interface READ_SERVER_SESSION__INTER {
//     select: string
// }

export async function READ_SERVER_SESSION(select: string[]) {



    let SessionCookie = cookies().get("session")?.value

    // console.log("SessionCookie XYZ", SessionCookie)

    if (SessionCookie != undefined) {
        let NIP = await READ_NIP_BY_SESSION(SessionCookie)
        if (NIP != undefined) {

            let DataPegawai: any = await AmbilDataPegawaiDariJSONDirectory(NIP)

            let IP_KOTOR = DataPegawai['IP Sikka'] as string

            DataPegawai['IP Sikka'] = IP_KOTOR.replaceAll("'", "")

            if (select[0] === "All") {
                return DataPegawai
            } else {
                let NewReturn = {}

                for (var i = 0; i < select.length; i++) {
                    Object.assign(NewReturn, { [select[i]]: DataPegawai[select[i]] })
                }

                return NewReturn
            }

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



// export async function READ_Session(NIP: string) {

//     const dbconnection = Connection()
//     let Query = `SELECT COUNT(*) FROM ${Table} WHERE STR_NIP9 = ?`
//     let result: any = await dbconnection.promise().query(Query, [NIP]);
//     dbconnection.end();

//     return result[0][0]['COUNT(*)']
// }


export async function READ_SESSION_BY_NIP(NIP: string) {

    let QUERY = {
        "METHOD": "CHECK",
        "WHERE": "STR_NIP9 = ?",
        "DATA": [NIP]
    }

    let hasil = await Execute(QUERY)

    console.log("hasil", hasil)

    return hasil[0][0]['COUNT(*)']
}

// terpakai
export async function READ_UserBySessionRequest(SessionCookie: any) {

    console.log("SessionCookie", SessionCookie)
    let QUERY = {
        "METHOD": "SELECT",
        "METHOD_QUERY": "STR_NIP9",
        "WHERE": "STR_Session = ?",
        "DATA": [SessionCookie]
    }

    let hasil = await Execute(QUERY)

    console.log("READ_UserBySessionRequest", hasil)
    if (hasil[0].length !== 0) {

        let DataPegawai = AmbilDataPegawaiDariJSONDirectory(hasil[0][0]['STR_NIP9'])


        return DataPegawai

    }
}




export async function CEK_UserBySessionRequest(request: any) {

    const Session = request.headers.get('authentication')

    try {
        let QUERY = {
            "METHOD": "CHECK",
            "METHOD_QUERY": "STR_NIP9",
            "WHERE": "STR_Session = ?",
            "DATA": [Session]
        }

        let hasil = await Execute(QUERY)

        return hasil[0][0]['COUNT(1)']

    } catch (error) {

        redirect('/Auth')
    }

}



export async function DELETE_Session(NIP: string) {


    let QUERY = {
        "METHOD": "DELETE",
        "WHERE": "STR_NIP9 = ?",
        "DATA": [NIP]
    }

    await Execute(QUERY)
}

