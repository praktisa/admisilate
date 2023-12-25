
import Connection from '@Connection';


const Table: string = 'tb_session'

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
    let result: any = await dbconnection.promise().query(Q, QUERY.DATA);
    dbconnection.end();

    return result
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
