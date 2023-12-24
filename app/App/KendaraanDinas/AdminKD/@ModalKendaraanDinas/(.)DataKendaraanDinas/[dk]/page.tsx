import React from 'react'
import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '@SchemaKD/schema_tb_kendaraan'
import FETCH_GET_DATA_MOBIL_BY_DK from '@/app/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_DATA_MOBIL_BY_DK/fetch'
import S_EditForm from '../../_Components/Edit_KD/S_EditForm'
import PortalNotification from '@/Global/Components/Portal/PortalNotification/PortalNotification'
import { ActionUpdateMobil } from '../Action/ActionUpdateMobil'




export default async function page({ params }: { params: { dk: string } }) {

    let DataMobil = await FETCH_GET_DATA_MOBIL_BY_DK(params.dk)

    return (
        <PortalNotification>
            <S_EditForm Data={DataMobil} ActionUpdateMobil={ActionUpdateMobil} />
        </PortalNotification>

    )
}



export async function generateStaticParams() {
    const ListDK = await READ_SEMUA_KENDARAAN_DINAS_ONLY_ID()

    return ListDK.map((dk: any) => ({
        dk: dk.ID,
    }))
}