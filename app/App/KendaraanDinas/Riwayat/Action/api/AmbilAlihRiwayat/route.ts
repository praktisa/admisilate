import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_INSERT_AMBIL_ALIH_PEMINJAMAN } from '@SchemaKD/schema_tb_kendaraan_status'
import { revalidateTag } from 'next/cache'
import { READ_SERVER_SESSION } from '@/app/Auth/action/function/Session'
import KlasifikasiSeksiPegawai from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/Action/KlasifikasiSeksiPegawai'

import { AmbilDataPegawaiDariJSONDirectory } from '@/app/Auth/action/function/function'
import { ADMIN_UPDATE_AMBIL_ALIH_REGISTER } from '@SchemaKD/schema_tb_kendaraan_register'
import { UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL } from '@SchemaKD/schema_tb_kendaraan'
// import { redirect } from 'next/navigation'


export async function POST(request: NextRequest, response: NextResponse) {


    let DataPegawai = await READ_SERVER_SESSION(["All"])

    let Peminjam = KlasifikasiSeksiPegawai(DataPegawai)

    const DATA = await request.json()



    let ID_STATUS_BARU = await ADMIN_INSERT_AMBIL_ALIH_PEMINJAMAN(DATA.ID_STATUS, DataPegawai['IP Sikka'], Peminjam, DATA.TGL_AMBIL)

    await ADMIN_UPDATE_AMBIL_ALIH_REGISTER(DATA.ID_REGISTER, ID_STATUS_BARU.ID_AMBIL_ALIH, Peminjam)

    let EndResult = await UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL(ID_STATUS_BARU.STR_ID_KENDARAAN)

    revalidateTag(`${ID_STATUS_BARU.STR_ID_KENDARAAN}`)
    revalidateTag('all_mobil')
    revalidateTag('AdminRiwayatKD')



    // console.log("Peminjam", Peminjam)
    // console.log("POST DATA", Obj_Request)
    // console.log("DataPegawai", DataPegawai)

    return NextResponse.json(EndResult)

}