import React from 'react'

import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID, READ_DATA_PEMINJAMAN_BY_ID } from '@SchemaKD/schema_tb_kendaraan_status'
import FETCH_GET_DATA_MOBIL_BY_DK from '@/app/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_DATA_MOBIL_BY_DK/fetch'
import { ClientFormPeminjaman } from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/components/C_Peminjaman'

import FETCH_GET_IMG_BY_DK from '@/app/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_IMG_BY_DK/fetch'
import { ActionUbahdanHapus } from '../../../@RiwayatPinjam/(.)EditPeminjaman/[dk]/[update]/Action/ActionUbahdanHapus'
import PortalNotification from '@/Global/Components/Portal/PortalNotification/PortalNotification'


interface ParamPinjam {
    params: { dk: string, update: string }
}

export default async function PeminjamanPage({ params }: ParamPinjam) {

    const DataMobil = await FETCH_GET_DATA_MOBIL_BY_DK(params.dk)
    const DataPinjaman = await READ_DATA_PEMINJAMAN_BY_ID(params.update)
    const ImgMobil = await FETCH_GET_IMG_BY_DK(params.dk)


    Object.assign(DataMobil, { "BLOB_IMG": ImgMobil.BLOB_IMG })

    return (
        <>
            <PortalNotification>
                <ClientFormPeminjaman
                    ServerAction={ActionUbahdanHapus}
                    DataMobil={DataMobil}
                    UpdateData={DataPinjaman}
                    From="Page"
                />
            </PortalNotification>
        </>
    )
}

export async function generateStaticParams() {
    const ListDK = await READ_SEMUA_KENDARAAN_DINAS_ONLY_ID()

    return ListDK.map((dk: any) => ({
        dk: dk.ID,
    }))
}