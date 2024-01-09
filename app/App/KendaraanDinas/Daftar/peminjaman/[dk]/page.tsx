
import React from 'react'

import FETCH_GET_DATA_MOBIL_BY_DK from '../../Action/api/FETCH_GET_DATA_MOBIL_BY_DK/fetch'
import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '@SchemaKD/schema_tb_kendaraan'

import { PinjamMobilState } from '../../@modal/(.)peminjaman/[dk]/Action/ActionPinjam'
import { ClientFormPeminjaman } from '../../@modal/(.)peminjaman/[dk]/components/C_Peminjaman'
import FETCH_GET_IMG_BY_DK from '../../Action/api/FETCH_GET_IMG_BY_DK/fetch'
import PortalNotification from '@/Global/Components/Portal/PortalNotification/PortalNotification'


export default async function page({ params }: { params: { dk: string } }) {


    let DataMobil = await FETCH_GET_DATA_MOBIL_BY_DK(params.dk)
    const ImgMobil = await FETCH_GET_IMG_BY_DK(params.dk)

    Object.assign(DataMobil, { "BLOB_IMG": ImgMobil.BLOB_IMG })

    // console.log('DataMobil', DataMobil)

    return (
        <>
            <PortalNotification>
                <ClientFormPeminjaman ServerAction={PinjamMobilState} DataMobil={DataMobil} From="Page" />
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