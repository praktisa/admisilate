import React from 'react'
import { READ_KENDARAAN_DINAS_BY_ID } from '../../@DaftarKendaraanDinas/Action/CRUD/DaftarKD_CRUD'
import { ClientFormPeminjaman } from '../../@modal/(.)peminjaman/[dk]/components/C_Peminjaman'


async function getDataMobil(dk: string) {


    // try {
    const resd: any = await fetch(`http://localhost:3000/App/KendaraanDinas/Action/api/GetDataMobil?DK=${dk}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // 'Authentication': Auth(AUTH)
        },
        next: { tags: [dk] }
    }).then(res => {
        console.log("Success " + dk, res.json())
        return res.json()

    }).catch(err => {
        console.log("ERROR FETCH DATA MOBIL " + dk, err)
    })


}

export default async function page({ params }: { params: { dk: string } }) {

    // 

    // const DataMobil = await getDataMobil(params.dk)

    let DataMobil = await READ_KENDARAAN_DINAS_BY_ID(params.dk)


    console.log("DataMobil DataMobil DataMobil", DataMobil)

    return (
        <>
            <div style={{ position: "relative" }}>


                <ClientFormPeminjaman DataMobil={DataMobil}>
                    <div>asd</div>
                </ClientFormPeminjaman>

            </div>
        </>

    )

}
