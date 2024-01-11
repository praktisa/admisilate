import React from 'react'
import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '@SchemaKD/schema_tb_kendaraan'
import { ClientFormPeminjaman } from './components/C_Peminjaman'
import FETCH_GET_DATA_MOBIL_BY_DK from '../../../Action/api/FETCH_GET_DATA_MOBIL_BY_DK/fetch'
import { PinjamMobilState } from './Action/ActionPinjam'
import FETCH_GET_IMG_BY_DK from '../../../Action/api/FETCH_GET_IMG_BY_DK/fetch'
import PortalNotification from '@/Global/Components/Portal/PortalNotification/PortalNotification'



interface ParamPinjam {
    params: { dk: string }
}


export default async function PeminjamanPage({ params }: ParamPinjam) {

    const DataMobil = await FETCH_GET_DATA_MOBIL_BY_DK(params.dk)
    const ImgMobil = await FETCH_GET_IMG_BY_DK(params.dk)

    Object.assign(DataMobil, { "BLOB_IMG": ImgMobil.BLOB_IMG })



    return (
        <>
            <PortalNotification>
                <ClientFormPeminjaman ServerAction={PinjamMobilState} DataMobil={DataMobil} From="Intercepting" />
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