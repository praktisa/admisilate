import React from 'react'
import GET_ALL_DataMobil from './Action/api/GET_ALL_DataMobil/fetch'
import CMP_DaftarMobil from './Components/Combined/CMP_DaftarMobil'



export default async function KendaraanDinasPage() {

    const SemuaKendaraanDinas = await GET_ALL_DataMobil()

    // console.log("SemuaKendaraanDinas", SemuaKendaraanDinas)

    return (
        <>
            <h1>Daftar Kendaraan Dinas</h1>

            <CMP_DaftarMobil Data={SemuaKendaraanDinas} />
        </>
    )
}
