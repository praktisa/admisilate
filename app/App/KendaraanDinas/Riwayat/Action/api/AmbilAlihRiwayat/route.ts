import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_INSERT_AMBIL_ALIH_PEMINJAMAN } from '../../Riwayat_CRUD'
import { revalidateTag } from 'next/cache'
import { READ_SERVER_SESSION } from '@/app/Auth/action/function/Session'
import KlasifikasiSeksiPegawai from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/Action/KlasifikasiSeksiPegawai'

import { AmbilDataPegawaiDariJSONDirectory } from '@/app/Auth/action/function/function'
import { ADMIN_UPDATE_AMBIL_ALIH_REGISTER } from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/Action/Register_CRUD'
import { UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_NAMA_MOBIL } from '@/app/App/KendaraanDinas/Daftar/Action/CRUD/DaftarKD_CRUD'
import { redirect } from 'next/navigation'


export async function POST(request: NextRequest, response: NextResponse) {


    let DataPegawai = await READ_SERVER_SESSION()

    let Peminjam = KlasifikasiSeksiPegawai(DataPegawai)

    const DATA = await request.json()



    let ID_STATUS_BARU = await ADMIN_INSERT_AMBIL_ALIH_PEMINJAMAN(DATA.ID_STATUS, DataPegawai['IP Sikka'], Peminjam, DATA.TGL_AMBIL)

    await ADMIN_UPDATE_AMBIL_ALIH_REGISTER(DATA.ID_REGISTER, ID_STATUS_BARU.ID_AMBIL_ALIH, Peminjam)

    let EndResult = await UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_NAMA_MOBIL(ID_STATUS_BARU.STR_NAMA_KENDARAAN)

    revalidateTag(`${ID_STATUS_BARU.STR_NAMA_KENDARAAN}`)
    revalidateTag('all_mobil')
    revalidateTag('AdminRiwayatKD')



    // console.log("Peminjam", Peminjam)
    // console.log("POST DATA", Obj_Request)
    // console.log("DataPegawai", DataPegawai)

    return NextResponse.json(EndResult)

}