import mysql from 'mysql2'

interface inter__getKendaraanByPlat {
    host: string,
    database: string,
    port: string,
    socket?: string,
    user: string,
    password: string
}

export default function Connection() {

    let Config: inter__getKendaraanByPlat = {
        host: "localhost",
        database: "db_admisi",
        port: "3307",
        // socket: "C:/xampp/mysql/mysql.sock",
        user: "root",
        password: ""

    }

    let Con: string = JSON.stringify(Config)

    const dbconnection = mysql.createConnection(JSON.parse(Con));

    return dbconnection
}