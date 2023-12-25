import React from 'react'
import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '../../../Action/CRUD/DaftarKD_CRUD'
import { Container_Form, NamaKendaraan, } from './components/S_Peminjaman'
import { ClientFormPeminjaman, ExitForm } from './components/C_Peminjaman'
import FETCH_GET_DATA_MOBIL_BY_DK from '../../../Action/api/FETCH_GET_DATA_MOBIL_BY_DK/fetch'
import { PinjamMobilState } from './Action/ActionPinjam'
import ImageFill from '../../../Components/Image/ImageFill'
import FETCH_GET_IMG_BY_DK from '../../../Action/api/FETCH_GET_IMG_BY_DK/fetch'
import PortalNotification from '@/Global/Components/Portal/PortalNotification/PortalNotification'



interface ParamPinjam {
    params: { dk: string }
}


export default async function PeminjamanPage({ params }: ParamPinjam) {

    const DataMobil = await FETCH_GET_DATA_MOBIL_BY_DK(params.dk)
    const ImgMobil = await FETCH_GET_IMG_BY_DK(params.dk)


    return (
        <>
            <Container_Form>
                <PortalNotification>
                    <ClientFormPeminjaman ServerAction={PinjamMobilState} DataMobil={DataMobil} />
                </PortalNotification>
            </Container_Form>

            <ExitForm />
            <NamaKendaraan nama={DataMobil.STR_NAMA} />
            <ImageFill src={ImgMobil.BLOB_IMG} animated hover={false} quality={75} />
        </>
    )
}

export async function generateStaticParams() {
    const ListDK = await READ_SEMUA_KENDARAAN_DINAS_ONLY_ID()

    return ListDK.map((dk: any) => ({
        dk: dk.ID,
    }))
}