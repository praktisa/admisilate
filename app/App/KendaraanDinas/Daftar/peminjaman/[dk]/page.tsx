
import React from 'react'

import GET_DATA_MOBIL_BY_DK from '../../Action/api/GET_Data_Mobil_BY_DK/fetch'
import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '../../Action/CRUD/DaftarKD_CRUD'

import { PinjamMobilState_WithRedirect } from '../../@modal/(.)peminjaman/[dk]/Action/ActionPinjam'

import { Container_Form_Page, NamaKendaraan } from '../../@modal/(.)peminjaman/[dk]/components/S_Peminjaman'
import { ClientFormPeminjaman, ExitForm } from '../../@modal/(.)peminjaman/[dk]/components/C_Peminjaman'


export default async function page({ params }: { params: { dk: string } }) {


    let DataMobil = await GET_DATA_MOBIL_BY_DK(params.dk)


    return (
        <>

            <Container_Form_Page>
                <ClientFormPeminjaman ServerAction={PinjamMobilState_WithRedirect} DataMobil={DataMobil} />
            </Container_Form_Page>


            <ExitForm />
            <NamaKendaraan nama={DataMobil.STR_NAMA} />


        </>

    )

}

export async function generateStaticParams() {
    const ListDK = await READ_SEMUA_KENDARAAN_DINAS_ONLY_ID()

    return ListDK.map((dk: any) => ({
        dk: dk.ID,
    }))
}