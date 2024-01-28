'use server'

import { READ_SERVER_SESSION } from "@/app/Auth/action/function/Session"
import KlasifikasiSeksiPegawai from "../../../Daftar/@modal/(.)peminjaman/[dk]/Action/KlasifikasiSeksiPegawai"
import { ADMIN_INSERT_AMBIL_ALIH_PEMINJAMAN, ADMIN_UPDATE_CEK_DAN_UBAH_PINJAMAN_LAMA, DELETE_DATA_PINJAM_MOBIL_BY_ID } from "@SchemaKD/schema_tb_kendaraan_status"
import { revalidatePath, revalidateTag } from "next/cache"
import { ADMIN_UPDATE_AMBIL_ALIH_REGISTER, ADMIN_UPDATE_KEMBALIKAN_REGISTER } from "@SchemaKD/schema_tb_kendaraan_register"
import { UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL } from "@SchemaKD/schema_tb_kendaraan"


export async function Action_Ambil_Alih(formData: FormData) {


    let DataPegawai = await READ_SERVER_SESSION(["IP Sikka", "Jabatan", "UNIT ORGANISASI"])

    let ID_REGISTER = formData.get("ID_REGISTER") as string
    let ID_STATUS = formData.get("ID_STATUS") as string
    let TGL_AMBIL = formData.get("TGL") as string

    let Peminjam = KlasifikasiSeksiPegawai(DataPegawai)

    try {
        let ID_STATUS_BARU = await ADMIN_INSERT_AMBIL_ALIH_PEMINJAMAN(ID_STATUS, DataPegawai['IP Sikka'], Peminjam, TGL_AMBIL)

        await ADMIN_UPDATE_AMBIL_ALIH_REGISTER(ID_REGISTER, ID_STATUS_BARU.ID_AMBIL_ALIH, Peminjam)

        let EndResult = await UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL(ID_STATUS_BARU.STR_ID_KENDARAAN)

        revalidateTag(`${ID_STATUS_BARU.STR_ID_KENDARAAN}`)
        revalidateTag('all_mobil')
        revalidateTag('AdminRiwayatKD')
        // revalidatePath('/App/KendaraanDinas/AdminKD/monitoring')

        console.log("SUKSES Action_Ambil_Alih")

        return {
            "STR_PEMINJAM": "Subbagian Umum dan Kepatuhan Internal",
            "STR_TUJUAN": "Digunakan Umum (Mandatory)",
            "STR_APPROVE": ID_STATUS,
            "ID_STATUS": ID_STATUS_BARU.ID_AMBIL_ALIH
        }

    } catch (error) {
        revalidatePath('/App/KendaraanDinas/AdminKD/monitoring')
        console.log("Errpr Action_Ambil_Alih", error)

        return {
            "STR_PEMINJAM": "-",
            "STR_TUJUAN": "Gagal Ambil Alih",
            "STR_APPROVE": 0,
            "ID_STATUS": 0
        }
    }


}



export async function Action_Kembalikan(formData: FormData) {

    let ID_REGISTER = formData.get("ID_REGISTER") as string
    let ID_STATUS = formData.get("ID_STATUS") as string
    let STR_APPROVE = formData.get("STR_APPROVE") as string
    let TGL_AMBIL = formData.get("TGL") as string

    let ReturnedData = {}

    try {
        await ADMIN_UPDATE_CEK_DAN_UBAH_PINJAMAN_LAMA(STR_APPROVE, TGL_AMBIL).then(async (Data) => {

            // apabila sukses maka akan mengeluarkan nama seksi yang telah diubah
            if (Data['Peminjam_Sebelumnya'].length !== 0) {

                // kemudian nama seksi tersebut dimasukan kedalam register yang ingin dikembalikan
                await ADMIN_UPDATE_KEMBALIKAN_REGISTER(ID_REGISTER, STR_APPROVE, Data['Peminjam_Sebelumnya'])
                    .then(async () => {

                        // setelah dimasukan hapus tb_kendaraan_status berdasarkan ID_AMBIL_ALIH agar tidak mempengaruhi register
                        try {
                            await DELETE_DATA_PINJAM_MOBIL_BY_ID(ID_STATUS, ID_STATUS)
                        } catch (error) {
                            console.log("Error Delete Data Pinjam Mobil", error)
                        }

                        revalidateTag(Data['Nama_Mobil'])
                        revalidateTag('all_mobil')
                        revalidateTag('AdminRiwayatKD')


                    }).catch((error_kembali) => {
                        console.log("Error Mengembalikan Pinjam Mobil", error_kembali)
                        Object.assign(Data, { "Kembalikan": 0 })
                    })
            }
            let PeminjamSebelumnya = {
                "STR_PEMINJAM": Data.Peminjam_Sebelumnya,
                "STR_TUJUAN": Data.Tujuan_Sebelumnya,
                "STR_APPROVE": Data.STR_APPROVE_Sebelumnya,
                "ID_STATUS": Data.ID_STATUS_Sebelumnya
            }

            ReturnedData = { ...PeminjamSebelumnya }

        })
    } catch (error) {

        revalidatePath('/App/KendaraanDinas/AdminKD/monitoring')

        let PeminjamSebelumnya = {
            "STR_PEMINJAM": "Error",
            "STR_TUJUAN": "Error Mengembalikan",
            "STR_APPROVE": 0,
            "ID_STATUS": 0
        }
        ReturnedData = { ...PeminjamSebelumnya }
    }

    return ReturnedData
    // redirect('/App/KendaraanDinas/AdminKD')
}



