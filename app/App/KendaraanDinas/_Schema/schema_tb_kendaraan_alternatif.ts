import { redirect } from 'next/navigation';
import { Execute_KendaraanDinas } from './executor_KendaraanDinas';
import { READ_REGISTER_BY_ID_MOBIL } from './schema_tb_kendaraan_register';


const Table: string = 'tb_kendaraandinas_alternatif'


export async function CREATE_KENDARAAN_DINAS_ALTERNATIF(Object_Data: any) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "INSERT",
        "DATA": Object_Data
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
}

// membaca semua rencana kerja yang dibuat 
export async function READ_SESI_ALTERNATIF_BY_ID(ID: string) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID_ALTERNATIF, STR_PEMINJAM, STR_TGL_TERPESAN, STR_TUJUAN, STR_TEMPAT",
        "WHERE": "ID_ALTERNATIF = ?",
        "DATA": [ID]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    if (hasil[0][0] !== undefined) {
        return hasil[0][0]
    } else {
        redirect('/App/KendaraanDinas/Daftar/')
    }



}


export async function DELETE_KENDARAAN_DINAS_ALTERNATIF_BY_ID(ID: string) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "DELETE",
        "WHERE": "ID_ALTERNATIF = ?",
        "DATA": [ID]
    }

    try {
        await Execute_KendaraanDinas(QUERY)

        return "Berhasil"
    } catch (error) {
        return "Failed"
    }

}
