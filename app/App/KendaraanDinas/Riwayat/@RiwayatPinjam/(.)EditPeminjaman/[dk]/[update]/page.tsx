import React from 'react'

import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID, READ_DATA_PEMINJAMAN_BY_ID } from '../../../../Action/Riwayat_CRUD'
import GET_DATA_MOBIL_BY_DK from '@/app/App/KendaraanDinas/Daftar/Action/api/GET_Data_Mobil_BY_DK/fetch'
import { Container_Form, NamaKendaraan } from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/components/S_Peminjaman'
import { ClientFormPeminjaman, ExitForm } from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/components/C_Peminjaman'
import { ActionUbahdanHapus } from './Action/ActionUbahdanHapus'



interface ParamPinjam {
    params: { dk: string, update: string }
}

export default async function PeminjamanPage({ params }: ParamPinjam) {

    const DataMobil = await GET_DATA_MOBIL_BY_DK(params.dk)
    const DataPinjaman = await READ_DATA_PEMINJAMAN_BY_ID(params.update)

    // console.log('DataPinjaman', DataPinjaman)

    return (
        <>
            <Container_Form>
                <ClientFormPeminjaman
                    ServerAction={ActionUbahdanHapus}
                    DataMobil={DataMobil}
                    UpdateData={DataPinjaman}
                />
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