import React from 'react'
import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '../../../Action/CRUD/DaftarKD_CRUD'
import { Container_Form, NamaKendaraan, } from './components/S_Peminjaman'
import { ClientFormPeminjaman, ExitForm } from './components/C_Peminjaman'
import GET_DATA_MOBIL_BY_DK from '../../../Action/api/GET_Data_Mobil_BY_DK/fetch'
import { PinjamMobilState } from './Action/ActionPinjam'



interface ParamPinjam {
    params: { dk: string }
}


export default async function PeminjamanPage({ params }: ParamPinjam) {

    const DataMobil = await GET_DATA_MOBIL_BY_DK(params.dk)
    // PinjamMobilState

    return (
        <>
            <Container_Form>
                <ClientFormPeminjaman ServerAction={PinjamMobilState} DataMobil={DataMobil} />

            </Container_Form>
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