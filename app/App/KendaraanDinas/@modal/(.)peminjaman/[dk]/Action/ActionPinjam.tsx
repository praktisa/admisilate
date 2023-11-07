'use server'

import { READ_NIP_BY_SESSION } from '@/app/Auth/action/function/Session'
import { AmbilDataPegawaiDariJSONDirectory } from '@/app/Auth/action/function/function'
import { cookies } from 'next/headers'
import KlasifikasiSeksiPegawai from './KlasifikasiSeksiPegawai'
import { CREATE_PINJAM__MOBIL } from './Pinjam_CRUD'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'



export async function PinjamMobil(formData: FormData) {



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
        "STR_STATUS": "pinjam"
    }



    await CREATE_PINJAM__MOBIL(ValueAdd)


    // revalidatePath(`/`)
    revalidateTag(`${ValueAdd.STR_ID_KENDARAAN}`)
    // redirect(`/App/KendaraanDinas`)

    // console.log("NIP", formData)
}

// export async function Logout() {

// }

export async function PinjamMobilState(prevData: any, formData: FormData) {



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
        "STR_STATUS": "pinjam"
    }



    let uhu = await CREATE_PINJAM__MOBIL(ValueAdd)


    // revalidatePath(`/`)
    revalidateTag(`${ValueAdd.STR_ID_KENDARAAN}`)
    // redirect(`/App/KendaraanDinas`)

    return ({ sts: true, msg: `Pemesanan Mobil ${ValueAdd.STR_NAMA_KENDARAAN} Berhasil!`, asd: uhu })
    // console.log("NIP", formData)
}

export async function Logout() {

}