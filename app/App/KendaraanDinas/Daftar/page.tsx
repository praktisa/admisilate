import React from 'react'
import GET_ALL_DataMobil from './Action/api/GET_ALL_DataMobil/fetch'
import CMP_DaftarMobil from './Components/Combined/CMP_DaftarMobil'
import FETCH_GET_OBJ_DATES_BOOKING from './Action/api/FETCH_GET_OBJ_DATES_BOOKING/fetch'
import FETCH_GET_IMG from './Action/api/FETCH_GET_IMG/fetch'



export default async function KendaraanDinasPage() {

    const SemuaKendaraanDinas = await GET_ALL_DataMobil()
    const SemuaObjDatesKendaraanDinas = await FETCH_GET_OBJ_DATES_BOOKING()
    const SemuaIMG = await FETCH_GET_IMG()

    for (var i = 0; i < SemuaKendaraanDinas.length; i++) {
        if (SemuaKendaraanDinas[i].ID === SemuaObjDatesKendaraanDinas[i].ID) {
            Object.assign(SemuaKendaraanDinas[i], { "OBJ_DATES_BOOKING": SemuaObjDatesKendaraanDinas[i].OBJ_DATES_BOOKING })
        }

        if (SemuaKendaraanDinas[i].ID === SemuaIMG[i].ID) {
            Object.assign(SemuaKendaraanDinas[i], { "BLOB_IMG": SemuaIMG[i].BLOB_IMG })
        }
    }

    return (
        <>
            <h1>Daftar Kendaraan Dinas</h1>

            <CMP_DaftarMobil Data={SemuaKendaraanDinas} />
        </>
    )
}
