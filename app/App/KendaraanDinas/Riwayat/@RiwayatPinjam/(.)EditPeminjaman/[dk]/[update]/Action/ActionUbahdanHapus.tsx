'use server'

import { READ_NIP_BY_SESSION } from '@/app/Auth/action/function/Session'
import { AmbilDataPegawaiDariJSONDirectory } from '@/app/Auth/action/function/function'

import { cookies } from 'next/headers'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import KlasifikasiSeksiPegawai from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/Action/KlasifikasiSeksiPegawai'
import { UPDATE_OBJ_DATES_BOOKING_MOBIL_BY_ID, UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL } from '@SchemaKD/schema_tb_kendaraan'
import { UPDATE_KENDARAAN_DINAS_BY_ID_PINJAM } from '@SchemaKD/schema_tb_kendaraan_status'
import { CEK_REGISTER, CREATE_REGISTER, UPDATE_REGISTER } from '@SchemaKD/schema_tb_kendaraan_register'



export async function DataProcessing(formData: FormData) {

    let SessionCookie = cookies().get("session")?.value
    let NIP = await READ_NIP_BY_SESSION(SessionCookie)
    let DataPegawai = await AmbilDataPegawaiDariJSONDirectory(NIP)
    let Peminjam = KlasifikasiSeksiPegawai(DataPegawai)

    let ID_MOBIL = formData.get("ID_MOBIL") as string
    let NAMA_MOBIL = formData.get("NAMA_MOBIL") as string
    let TGL_BEFORE = formData.get("TGL_BEFORE") as string
    let TGL_AFTER = JSON.stringify((formData.get("Chosen__TGL") as string).split(",")) as string

    let ID_PINJAM = formData.get("ID_PINJAM") as string
    let STR_TGL = JSON.stringify((formData.get("Chosen__TGL") as string).split(",")) as string
    let STR_TEMPAT = formData.get("Lokasi Kegiatan") as string
    let STR_TUJUAN = formData.get("Tujuan Penggunaan") as string


    return { ID_MOBIL, NAMA_MOBIL, TGL_BEFORE, TGL_AFTER, ID_PINJAM, STR_TGL, STR_TEMPAT, STR_TUJUAN, Peminjam }
}


export async function ActionUbahdanHapus(formData: FormData) {

    let {
        ID_MOBIL,
        NAMA_MOBIL,
        TGL_BEFORE,
        TGL_AFTER,
        ID_PINJAM,
        STR_TGL,
        STR_TEMPAT,
        STR_TUJUAN,
        Peminjam
    } = await DataProcessing(formData)



    await CEK_REGISTER((formData.get("Chosen__TGL") as string).split(","), ID_MOBIL)
        .then(async (HASIL_CEK_REGISTER) => {

            // console.log("HASIL_CEK_REGISTER dari EDIT", HASIL_CEK_REGISTER)
            // console.log("TGL_AFTER dari EDIT", JSON.parse(TGL_AFTER))


            await CREATE_REGISTER(JSON.parse(ID_PINJAM), ID_MOBIL, NAMA_MOBIL, HASIL_CEK_REGISTER['0'], Peminjam)
            await UPDATE_REGISTER(JSON.parse(ID_PINJAM), JSON.parse(TGL_AFTER))

            // TGL_AFTER = JSON.stringify(HASIL_CEK_REGISTER['0'])

            // await UPDATE_OBJ_DATES_BOOKING_MOBIL_BY_ID(
            //     ID_MOBIL, TGL_BEFORE, TGL_AFTER, Peminjam
            // )

            await UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL(ID_MOBIL)

            await UPDATE_KENDARAAN_DINAS_BY_ID_PINJAM(
                ID_PINJAM,
                STR_TGL,
                STR_TEMPAT,
                STR_TUJUAN
            )

        })


    revalidateTag(`${ID_MOBIL}`)
    revalidateTag('all_mobil')

    // console.log("formData", formData)

    // // redirect(`/App/KendaraanDinas/Daftar`)

    return ({

        success: true,
        HeadMsg: "Peminjman Mobil",
        BodyMsg: "Berhasil Diubah 😄 !! ",
        loadmsg: `Pengubahan `,
    })



}

export async function Action_Selection_Delete(formData: FormData) {
    console.log("formData ActionRiwayatHapus", formData)
}