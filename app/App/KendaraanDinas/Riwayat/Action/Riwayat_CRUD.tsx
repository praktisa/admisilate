import { READ_SERVER_SESSION } from '@/app/Auth/action/function/Session';

import Connection from '@Connection';
import { UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_NAMA_MOBIL } from '../../Daftar/Action/CRUD/DaftarKD_CRUD';
import { redirect } from 'next/navigation';


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

export async function READ_PEMINJAMAN_MOBIL_BY_SESSION() {

    let DataPegawai = await READ_SERVER_SESSION()

    // console.log("READ_PEMINJAMAN_MOBIL_BY_SESSION", DataPegawai)

    let QUERY = {
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID_STATUS, STR_ID_KENDARAAN, STR_NAMA_KENDARAAN, STR_TUJUAN ,STR_TGL, STR_STATUS",
        "WHERE": "STR_PEMINJAM = ? ORDER BY ID_STATUS DESC",
        "DATA": [DataPegawai['UNIT ORGANISASI']]
    }

    let hasil = await Execute(QUERY)

    return hasil[0]
}


export async function READ_SEMUA_KENDARAAN_DINAS_ONLY_ID() {

    let QUERY = {
        "METHOD": "SELECT_ALL",
        "METHOD_QUERY": "ID_STATUS",
    }

    let hasil = await Execute(QUERY)

    return hasil[0]
}




// apabila user dalam seksi tersebut mengklik "Edit", maka eksekusi query dibawah
export async function READ_DATA_PEMINJAMAN_BY_ID(ID: string) {

    let QUERY = {
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID_STATUS, STR_TGL, STR_TEMPAT, STR_TUJUAN",
        "WHERE": "ID_STATUS = ?",
        "DATA": [ID]
    }

    let hasil = await Execute(QUERY)

    return hasil[0][0]
}


export async function UPDATE_DATA_PINJAM_MOBIL_BY_ID(ID: string, TGL: any, TEMPAT: string, TUJUAN: string) {

    let QUERY = {
        "METHOD": "UPDATE",
        "METHOD_QUERY": "STR_TGL = ?, STR_TEMPAT = ?, STR_TUJUAN = ?",
        "WHERE": "ID_STATUS = ?",
        "DATA": [TGL, TEMPAT, TUJUAN, ID]
    }

    let hasil = await Execute(QUERY)

    return hasil[0]
}



export async function DELETE_DATA_PINJAM_MOBIL_BY_ID(ID_PINJAM: string, ID_MOBIL: string) {


    let QUERY_AMBIL_NAMA_MOBIL = {
        "METHOD": "SELECT",
        "METHOD_QUERY": "STR_NAMA_KENDARAAN",
        "WHERE": "ID_STATUS = ?",
        "DATA": [ID_PINJAM]
    }

    let NamaKendaraan = (await Execute(QUERY_AMBIL_NAMA_MOBIL))[0][0]['STR_NAMA_KENDARAAN']


    let QUERY_DELETE = {
        "METHOD": "DELETE",
        "WHERE": "ID_STATUS = ?",
        "DATA": [ID_PINJAM]
    }


    // UPDATE DATA PADA KENDARAAN DINAS OBJ DATE



    let hasil = await Execute(QUERY_DELETE)
        .then(async () => {
            await UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_NAMA_MOBIL(NamaKendaraan)
        })




    redirect('/App/KendaraanDinas/Riwayat')

    return "Ok"
}
