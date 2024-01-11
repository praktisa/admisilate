import Connection from '@Connection';


export async function Execute_Kepegawaian(QUERY: any) {

    let TABLE = QUERY.TABLE
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

    // console.log("Q Q Q", Q, QUERY)

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
