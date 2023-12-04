'use server'

import { READ_NIP_BY_SESSION } from '@/app/Auth/action/function/Session'
import { AmbilDataPegawaiDariJSONDirectory } from '@/app/Auth/action/function/function'

import { cookies } from 'next/headers'
import KlasifikasiSeksiPegawai from './KlasifikasiSeksiPegawai'
import { CREATE_PINJAM__MOBIL } from './Pinjam_CRUD'

import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { CEK_REGISTER, CREATE_REGISTER } from './Register_CRUD'


export async function DataProcessing(formData: FormData) {

    let SessionCookie = cookies().get("session")?.value
    let NIP = await READ_NIP_BY_SESSION(SessionCookie)
    let DataPegawai = await AmbilDataPegawaiDariJSONDirectory(NIP)
    let Peminjam = KlasifikasiSeksiPegawai(DataPegawai)


    let ValueAdd = {
        "STR_ID_KENDARAAN": formData.get("ID_MOBIL") as string,
        "STR_NAMA_KENDARAAN": formData.get("NAMA_MOBIL") as string,
        "STR_NIP9": await READ_NIP_BY_SESSION(SessionCookie),

        "STR_PEMINJAM": Peminjam,
        "STR_TGL": JSON.stringify(formData.getAll("TGL")) as string,
        "STR_TEMPAT": formData.get("Lokasi Kegiatan") as string,
        "STR_TUJUAN": formData.get("Tujuan Penggunaan") as string,
        "STR_STATUS": "Terpinjam"
    }


    return ValueAdd
}


export async function PinjamMobilState(prevData: any, formData: FormData) {

    let ValueAdd = await DataProcessing(formData)

    let Chosen_TGL = (formData.get("Chosen__TGL") as string).split(",")


    await CEK_REGISTER(Chosen_TGL, ValueAdd.STR_NAMA_KENDARAAN)
        .then(async (HASIL_CEK_REGISTER) => {

            ValueAdd.STR_TGL = JSON.stringify(HASIL_CEK_REGISTER['0'])
            let ID_INSERTED = await CREATE_PINJAM__MOBIL(ValueAdd)

            await CREATE_REGISTER(ID_INSERTED, ValueAdd.STR_NAMA_KENDARAAN, HASIL_CEK_REGISTER['0'], ValueAdd.STR_PEMINJAM)
        })


    // await CREATE_PINJAM__MOBIL(ValueAdd)

    revalidateTag(`${ValueAdd.STR_ID_KENDARAAN}`)
    revalidateTag('all_mobil')

    return ({
        success: true,
        HeadMsg: ValueAdd.STR_NAMA_KENDARAAN,
        BodyMsg: "Berhasil dipinjam 😄 !! ",
        loadmsg: `Peminjaman ${ValueAdd.STR_NAMA_KENDARAAN}`,
    })
}


export async function PinjamMobilState_WithRedirect(prevData: any, formData: FormData) {

    let ValueAdd = await DataProcessing(formData)

    await CEK_REGISTER((formData.getAll("TGL") as string[]), ValueAdd.STR_NAMA_KENDARAAN)
        .then(async (HASIL_CEK_REGISTER) => {

            ValueAdd.STR_TGL = JSON.stringify(HASIL_CEK_REGISTER['0'])
            let ID_INSERTED = await CREATE_PINJAM__MOBIL(ValueAdd)

            await CREATE_REGISTER(ID_INSERTED, ValueAdd.STR_NAMA_KENDARAAN, HASIL_CEK_REGISTER['0'], ValueAdd.STR_PEMINJAM)
        })

    revalidateTag(`${ValueAdd.STR_ID_KENDARAAN}`)
    revalidateTag('all_mobil')

    redirect('/App/KendaraanDinas/Riwayat')

    return ({
        success: true,
        HeadMsg: ValueAdd.STR_NAMA_KENDARAAN,
        BodyMsg: "Berhasil dipinjam 😄 !! ",
        loadmsg: `Peminjaman ${ValueAdd.STR_NAMA_KENDARAAN}`,
    })
}
