import React from 'react'
import { READ_KENDARAAN_DINAS_BY_ID, READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '../../../@DaftarKendaraanDinas/Action/CRUD/DaftarKD_CRUD'
import { Container_Form, FormPeminjaman, GridTujuanLokasi, NamaKendaraan, SegmentForm, SubmitForm } from './components/S_Peminjaman'
import Kalender from '@/Global/Components/Kalender/KalenderCookie'
import { ClientFormPeminjaman, ExitForm } from './components/C_Peminjaman'



interface ParamPinjam {
    params: { dk: string }
}


async function getDataMobil(dk: string) {


    try {
        const res: any = await fetch(`http://localhost:3000/App/KendaraanDinas/Action/api/GetDataMobil?DK=${dk}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                // 'Authentication': Auth(AUTH)
            },
            next: { tags: [dk] }
        })

        return res.json()

    } catch (error) {
        console.log("ERROR", error)

        return error
    }

}




export default async function PeminjamanPage({ params }: ParamPinjam) {

    const DataMobil = await getDataMobil(params.dk)

    console.log("DataMobil", DataMobil)

    return (
        <>
            <Container_Form>
                <ClientFormPeminjaman DataMobil={DataMobil} >
                    <input input-type="hidden" type="text" name="NAMA_MOBIL" defaultValue={DataMobil.STR_NAMA} />
                    <input input-type="hidden" type="text" name="ID_MOBIL" defaultValue={params.dk} />

                    <SegmentForm
                        label={"Pilih Tanggal"}
                        after={<SubmitForm />}
                        before={<label data-type="before" htmlFor='Tujuan dan Lokasi'>Sebelumnya</label>}
                    >
                        <Kalender terpinjam={DataMobil.OBJ_DATES_BOOKING} />
                    </SegmentForm>

                    <SegmentForm
                        label={"Tujuan dan Lokasi"}
                        after={<label data-type="after" htmlFor='Pilih Tanggal'>Lanjut</label>}
                    >
                        <GridTujuanLokasi />
                    </SegmentForm>

                </ClientFormPeminjaman>


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