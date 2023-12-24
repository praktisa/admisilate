
import React from 'react'

import FETCH_GET_DATA_MOBIL_BY_DK from '../../Action/api/FETCH_GET_DATA_MOBIL_BY_DK/fetch'
import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '@SchemaKD/schema_tb_kendaraan'

import { PinjamMobilState_WithRedirect } from '../../@modal/(.)peminjaman/[dk]/Action/ActionPinjam'

import { Container_Form_Page, NamaKendaraan } from '../../@modal/(.)peminjaman/[dk]/components/S_Peminjaman'
import { ClientFormPeminjaman, ExitForm } from '../../@modal/(.)peminjaman/[dk]/components/C_Peminjaman'
import ImageFill from '../../Components/Image/ImageFill'


export default async function page({ params }: { params: { dk: string } }) {


    let DataMobil = await FETCH_GET_DATA_MOBIL_BY_DK(params.dk)


    return (
        <>

            <Container_Form_Page>
                <ClientFormPeminjaman ServerAction={PinjamMobilState_WithRedirect} DataMobil={DataMobil} />

            </Container_Form_Page>


            <ExitForm />
            <NamaKendaraan nama={DataMobil.STR_NAMA} />
            <ImageFill src={DataMobil.BLOB_IMG} animated hover={false} quality={75} />


        </>

    )

}

export async function generateStaticParams() {
    const ListDK = await READ_SEMUA_KENDARAAN_DINAS_ONLY_ID()

    return ListDK.map((dk: any) => ({
        dk: dk.ID,
    }))
}