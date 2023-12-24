import React from 'react'

import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID, READ_DATA_PEMINJAMAN_BY_ID } from '@SchemaKD/schema_tb_kendaraan_status'
import FETCH_GET_DATA_MOBIL_BY_DK from '@/app/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_DATA_MOBIL_BY_DK/fetch'
import { Container_Form, NamaKendaraan } from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/components/S_Peminjaman'
import { ClientFormPeminjaman, ExitForm } from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/components/C_Peminjaman'
import { ActionUbahdanHapus } from './Action/ActionUbahdanHapus'
import ImageFill from '@/app/App/KendaraanDinas/Daftar/Components/Image/ImageFill'



interface ParamPinjam {
    params: { dk: string, update: string }
}

export default async function PeminjamanPage({ params }: ParamPinjam) {

    const DataMobil = await FETCH_GET_DATA_MOBIL_BY_DK(params.dk)
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