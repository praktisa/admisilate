'use server'
import 'server-only'

import { READ_NIP_BY_SESSION } from '@/app/Auth/action/function/Session'
import { AmbilDataPegawaiDariJSONDirectory } from '@/app/Auth/action/function/function'
import { cookies } from 'next/headers'
import KlasifikasiSeksiPegawai from './KlasifikasiSeksiPegawai'

import { revalidateTag } from 'next/cache'

import { CEK_REGISTER, CREATE_REGISTER } from '@SchemaKD/schema_tb_kendaraan_register'
import { CREATE_PINJAM__MOBIL } from '@SchemaKD/schema_tb_kendaraan_status'
import { UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL } from '@SchemaKD/schema_tb_kendaraan'
import { CREATE_KENDARAAN_DINAS_ALTERNATIF } from '@/app/App/KendaraanDinas/_Schema/schema_tb_kendaraan_alternatif'


export async function DataProcessing(formData: FormData) {

    let SessionCookie = cookies().get("session")?.value
    let NIP = await READ_NIP_BY_SESSION(SessionCookie)
    let DataPegawai = await AmbilDataPegawaiDariJSONDirectory(NIP)
    let Peminjam = KlasifikasiSeksiPegawai(DataPegawai)

    // let TGL_INSERT = typeof formData.get("TGL") === "string" ? formData.get("TGL") : JSON.stringify(formData.getAll("TGL")) as string

    let ValueAdd = {
        "STR_ID_KENDARAAN": formData.get("ID_MOBIL") as string,
        "STR_NAMA_KENDARAAN": formData.get("NAMA_MOBIL") as string,
        "STR_NIP9": NIP,

        "STR_PEMINJAM": Peminjam,
        "STR_TGL": JSON.stringify(formData.getAll("TGL")) as string,
        "STR_TEMPAT": formData.get("Lokasi Kegiatan") as string,
        "STR_TUJUAN": formData.get("Tujuan Penggunaan") as string,
        "STR_STATUS": "Terpinjam"
    }

    // console.log("TYPE OF", typeof formData.getAll("TGL") === "string", typeof formData.get("TGL"), formData.get("TGL"))

    // console.log("TGL_INSERT", TGL_INSERT)
    console.log("ValueAdd", ValueAdd)

    return ValueAdd
}


export async function PinjamMobilState(formData: FormData) {

    let ValueAdd = await DataProcessing(formData)

    let Chosen_TGL = (formData.get("Chosen__TGL") as string).split(",").sort()

    console.log("Chosen_TGL", Chosen_TGL)

    try {
        let ReturnedData = await CEK_REGISTER(Chosen_TGL, ValueAdd.STR_NAMA_KENDARAAN)
            .then(async (HASIL_CEK_REGISTER) => {

                ValueAdd.STR_TGL = JSON.stringify(HASIL_CEK_REGISTER['0'])
                let ID_INSERTED = await CREATE_PINJAM__MOBIL(ValueAdd)

                console.log("CEK HASIL REGISTER", ValueAdd.STR_TGL)

                await CREATE_REGISTER(ID_INSERTED, ValueAdd.STR_ID_KENDARAAN, ValueAdd.STR_NAMA_KENDARAAN, HASIL_CEK_REGISTER['0'], ValueAdd.STR_PEMINJAM)

                await UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL(ValueAdd.STR_ID_KENDARAAN)

                if (HASIL_CEK_REGISTER[1].length > 0) {
                    let Add_Alternate = {
                        "STR_PEMINJAM": ValueAdd.STR_PEMINJAM,
                        "STR_TGL_TERPESAN": JSON.stringify(HASIL_CEK_REGISTER[1]),
                        "STR_TUJUAN": ValueAdd.STR_TUJUAN,
                        "STR_LOKASI": ValueAdd.STR_TEMPAT,
                    }
                    await CREATE_KENDARAAN_DINAS_ALTERNATIF(Add_Alternate)
                }

                return HASIL_CEK_REGISTER
            })

        revalidateTag(`${ValueAdd.STR_ID_KENDARAAN}`)
        revalidateTag('all_obj_dates')

        if (ReturnedData[1].length > 0) {


            return {
                sebagian: true,

            }
        } else {
            return {
                sebagian: false,

            }
        }


    } catch (error) {
        return JSON.stringify(error)
    }
}


export async function PinjamMobilState_WithRedirect(formData: FormData) {

    let ValueAdd = await DataProcessing(formData)

    try {

        let ReturnedData = await CEK_REGISTER((formData.getAll("TGL") as string[]), ValueAdd.STR_NAMA_KENDARAAN)
            .then(async (HASIL_CEK_REGISTER) => {

                ValueAdd.STR_TGL = JSON.stringify(HASIL_CEK_REGISTER['0'])

                console.log("HASIL_CEK_REGISTER", HASIL_CEK_REGISTER)
                // let ID_INSERTED = await CREATE_PINJAM__MOBIL(ValueAdd)

                // await CREATE_REGISTER(ID_INSERTED, ValueAdd.STR_NAMA_KENDARAAN, HASIL_CEK_REGISTER['0'], ValueAdd.STR_PEMINJAM)
                // await UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL(ValueAdd.STR_ID_KENDARAAN)
                return HASIL_CEK_REGISTER
            })

        revalidateTag(`${ValueAdd.STR_ID_KENDARAAN}`)
        revalidateTag('all_obj_dates')

        return ReturnedData

    } catch (error) {
        return JSON.stringify(error)
    }

}
