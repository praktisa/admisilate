import { READ_SERVER_SESSION } from '@/app/Auth/action/function/Session';
import { Execute_KendaraanDinas } from './executor_KendaraanDinas';
import { INSERT_OBJ_DATES_BOOKING_MOBIL_BY_ID, UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL } from './schema_tb_kendaraan';
import KlasifikasiSeksiPegawai from '../Daftar/@modal/(.)peminjaman/[dk]/Action/KlasifikasiSeksiPegawai';

const Table: string = 'tb_kendaraandinas_status'

export async function CREATE_PINJAM__MOBIL(Object_Data: any) {

    // berfungsi untuk menambahkan saja tetapi tidak menggunakan UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL agar tidak berat
    // let TGL_IN_DATABASE_UPDATE = await INSERT_OBJ_DATES_BOOKING_MOBIL_BY_ID(
    //     Object_Data.STR_ID_KENDARAAN,
    //     Object_Data.STR_TGL,
    //     Object_Data.STR_PEMINJAM
    // )



    let QUERY = {
        "TABLE": Table,
        "METHOD": "INSERT",
        "DATA": Object_Data
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    // console.log("UPDATEEEE", Update)

    return hasil[0].insertId
}

export async function UPDATE_KENDARAAN_DINAS_BY_ID_PINJAM(ID: string, TGL: any, TEMPAT: string, TUJUAN: string) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "UPDATE",
        "METHOD_QUERY": "STR_TGL = ?, STR_TEMPAT = ?, STR_TUJUAN = ?",
        "WHERE": "ID_STATUS = ?",
        "DATA": [TGL, TEMPAT, TUJUAN, ID]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
}









//  < < < < < < < HANDLE RIWAYAT > > > > > > > > >


export async function READ_PEMINJAMAN_MOBIL_BY_SESSION() {

    let DataPegawai = await READ_SERVER_SESSION(["All"])

    let Unit = KlasifikasiSeksiPegawai(DataPegawai)

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID_STATUS, STR_ID_KENDARAAN, STR_NAMA_KENDARAAN, STR_TUJUAN, STR_TEMPAT ,STR_TGL, STR_STATUS",
        "WHERE": "STR_PEMINJAM = ? ORDER BY ID_STATUS DESC",
        "DATA": [Unit]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
}

export async function READ_COUNT_PEMINJAMAN_MOBIL_BY_SESSION() {

    let DataPegawai = await READ_SERVER_SESSION(["All"])

    let Unit = KlasifikasiSeksiPegawai(DataPegawai)

    let QUERY = {
        "TABLE": Table,
        "METHOD": "CHECK",
        "WHERE": "STR_PEMINJAM = ?",
        "DATA": [Unit]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0][0]['COUNT(1)']
}


export async function READ_SEMUA_KENDARAAN_DINAS_ONLY_ID() {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT_ALL",
        "METHOD_QUERY": "ID_STATUS",
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
}

// apabila user dalam seksi tersebut mengklik "Edit", maka eksekusi query dibawah
export async function READ_DATA_PEMINJAMAN_BY_ID(ID_STATUS: string) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "SELECT",
        "METHOD_QUERY": "ID_STATUS, STR_ID_KENDARAAN, STR_NAMA_KENDARAAN, STR_PEMINJAM, STR_TGL, STR_TEMPAT, STR_TUJUAN, STR_STATUS",
        "WHERE": "ID_STATUS = ?",
        "DATA": [ID_STATUS]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0][0]
}


export async function UPDATE_DATA_PINJAM_MOBIL_BY_ID(ID: string, TGL: any, TEMPAT: string, TUJUAN: string) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "UPDATE",
        "METHOD_QUERY": "STR_TGL = ?, STR_TEMPAT = ?, STR_TUJUAN = ?",
        "WHERE": "ID_STATUS = ?",
        "DATA": [TGL, TEMPAT, TUJUAN, ID]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
}



export async function DELETE_DATA_PINJAM_MOBIL_BY_ID(ID_PINJAM: string, ID_MOBIL: string) {


    let QUERY_AMBIL_NAMA_MOBIL = {
        "TABLE": Table,
        "METHOD": "SELECT",
        "METHOD_QUERY": "STR_ID_KENDARAAN",
        "WHERE": "ID_STATUS = ?",
        "DATA": [ID_PINJAM]
    }

    let IDKendaraan = (await Execute_KendaraanDinas(QUERY_AMBIL_NAMA_MOBIL))[0][0]['STR_ID_KENDARAAN']


    let QUERY_DELETE = {
        "TABLE": Table,
        "METHOD": "DELETE",
        "WHERE": "ID_STATUS = ?",
        "DATA": [ID_PINJAM]
    }



    try {
        await Execute_KendaraanDinas(QUERY_DELETE)
            .then(async () => {
                await UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL(IDKendaraan)
            })

        return "Berhasil"

    } catch (error) {

        return "Failed"
    }









}

export async function ADMIN_UPDATE_TGL_STATUS_LAMA_AND_STR_APPROVE_BY_ID_STATUS_LAMA(ID_STATUS: string, TGL_BARU_SETELAH_DIAMBIL: string[], STR_STATUS: any, STR_APPROVE: string) {

    let QUERY = {
        "TABLE": Table,
        "METHOD": "UPDATE",
        "METHOD_QUERY": "STR_TGL = ?, STR_STATUS = ?, STR_APPROVE = ?",
        "WHERE": "ID_STATUS = ?",
        "DATA": [JSON.stringify(TGL_BARU_SETELAH_DIAMBIL), STR_STATUS, STR_APPROVE, ID_STATUS]
    }

    let hasil = await Execute_KendaraanDinas(QUERY)

    return hasil[0]
}

export async function ADMIN_INSERT_AMBIL_ALIH_PEMINJAMAN(ID_STATUS: string, NIP: string, Peminjam: String, TGL_AMBIL: string) {


    // ambil data sebelumnya
    let DataPeminjamSebelumnya = await READ_DATA_PEMINJAMAN_BY_ID(ID_STATUS)

    let TGL_LAMA = JSON.parse(DataPeminjamSebelumnya.STR_TGL)

    let TGL_BARU_SETELAH_DIAMBIL = []

    for (var i = 0; i < TGL_LAMA.length; i++) {
        if (TGL_LAMA[i] != TGL_AMBIL) {
            TGL_BARU_SETELAH_DIAMBIL.push(TGL_LAMA[i])
        }
    }

    console.log("TGL_BARU_SETELAH_DIAMBIL", TGL_BARU_SETELAH_DIAMBIL, typeof TGL_AMBIL, TGL_AMBIL)

    let Object_AmbilAlih = {
        "STR_ID_KENDARAAN": DataPeminjamSebelumnya.STR_ID_KENDARAAN,
        "STR_NAMA_KENDARAAN": DataPeminjamSebelumnya.STR_NAMA_KENDARAAN,
        "STR_NIP9": NIP,
        "STR_PEMINJAM": Peminjam,
        "STR_TGL": `["${TGL_AMBIL}"]`,
        "STR_TEMPAT": "-",
        "STR_TUJUAN": "Digunakan Umum (Mandatory)",
        "STR_STATUS": "Ambil Alih",
        "STR_APPROVE": DataPeminjamSebelumnya.ID_STATUS
    }

    let QUERY_AMBIL_ALIH = {
        "TABLE": Table,
        "METHOD": "INSERT",
        "DATA": [Object_AmbilAlih]
    }

    // eksekusi dan ambil ID
    let ID_AMBIL_ALIH = await Execute_KendaraanDinas(QUERY_AMBIL_ALIH)


    let STR_STATUS = ""

    // cek apabila STR_STATUS sebelumnya memiliki kata "Digunakan Umum (Mandatory)"
    if (!DataPeminjamSebelumnya.STR_STATUS.includes("Digunakan Umum")) {
        // Apabila belum, maka buatkan
        console.log("TIDAK MENGANDUNG MANDATORY")

        STR_STATUS = `${TGL_AMBIL} - Digunakan Umum (Mandatory)`
    } else {
        // apabila sudah, ambil STR_STATUS sebelumnya, pecah tanggalnya jadi array kemudian masukan tanggal ambil yang baru

        console.log("MENGANDUNG MANDATORY")
        let Array_TGL_STR_STATUS = DataPeminjamSebelumnya.STR_STATUS.split(" - ")

        let NEW_STATUS = (Array_TGL_STR_STATUS[0].concat(", ", TGL_AMBIL))

        STR_STATUS = `${NEW_STATUS} - Digunakan Umum (Mandatory)`
    }

    // berfungsi untuk mengupdate tanggal setelah diambil alih oleh admin serta menambahkan keterangan didalamnya
    await ADMIN_UPDATE_TGL_STATUS_LAMA_AND_STR_APPROVE_BY_ID_STATUS_LAMA(ID_STATUS, TGL_BARU_SETELAH_DIAMBIL, STR_STATUS, ID_AMBIL_ALIH[0].insertId)


    let ReturnData = {
        "ID_AMBIL_ALIH": ID_AMBIL_ALIH[0].insertId,
        "STR_NAMA_KENDARAAN": Object_AmbilAlih.STR_NAMA_KENDARAAN,
        "STR_ID_KENDARAAN": Object_AmbilAlih.STR_ID_KENDARAAN
    }

    return ReturnData
}

export async function ADMIN_UPDATE_CEK_DAN_UBAH_PINJAMAN_LAMA(ID_STATUS_LAMA: string, TGL_KEMBALI: string) {
    // ID STATUS LAMA   
    let DataPeminjamSebelumnya = await READ_DATA_PEMINJAMAN_BY_ID(ID_STATUS_LAMA)

    if (Object.keys(DataPeminjamSebelumnya).length != 0) {
        // Kembalikan Tanggal 
        let TGL_LAMA = JSON.parse(DataPeminjamSebelumnya.STR_TGL)
        TGL_LAMA.push(TGL_KEMBALI)


        let STR_STATUS = ""

        // ubahSTR_STATUS
        if (DataPeminjamSebelumnya.STR_STATUS.includes("Digunakan Umum")) {
            // apabila sudah, ambil STR_STATUS sebelumnya, pecah tanggalnya jadi array kemudian masukan tanggal ambil yang baru
            let SISA_TGL = []

            let Array_TGL_STR_STATUS = DataPeminjamSebelumnya.STR_STATUS.split(" - ")[0].split(", ")

            for (var i = 0; i < Array_TGL_STR_STATUS.length; i++) {
                if (Array_TGL_STR_STATUS[i] != TGL_KEMBALI) {
                    SISA_TGL.push(Array_TGL_STR_STATUS[i])
                }
            }

            if (SISA_TGL.length != 0) {
                console.log("SISAAA")
                STR_STATUS = `${SISA_TGL.join(", ")} - Digunakan Umum (Mandatory)`

            } else {
                STR_STATUS = "Terpinjam"
            }
        } else {
            STR_STATUS = "Terpinjam"
        }


        let QUERY = {
            "TABLE": Table,
            "METHOD": "UPDATE",
            "METHOD_QUERY": "STR_TGL = ?, STR_STATUS = ?",
            "WHERE": "ID_STATUS = ?",
            "DATA": [JSON.stringify(TGL_LAMA), STR_STATUS, ID_STATUS_LAMA]
        }

        let hasil = await Execute_KendaraanDinas(QUERY)




        return {
            "Peminjam_Sebelumnya": DataPeminjamSebelumnya.STR_PEMINJAM,
            "Tujuan_Sebelumnya": DataPeminjamSebelumnya.STR_TUJUAN,
            "Nama_Mobil": DataPeminjamSebelumnya.STR_NAMA_KENDARAAN,
            "STR_APPROVE_Sebelumnya": DataPeminjamSebelumnya.STR_APPROVE,
            "ID_STATUS_Sebelumnya": DataPeminjamSebelumnya.ID_STATUS
        }

    } else {
        return { "Peminjam_Sebelumnya": "", "Nama_Mobil": "", "Kembalikan": 0, "Hapus": 0 }
    }

}