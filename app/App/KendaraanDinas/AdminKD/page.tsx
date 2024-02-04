import React from 'react'
import { ADMIN_READ_ALL_REGISTER } from '@SchemaKD/schema_tb_kendaraan_register'
import LAKD from './layoutAdminKD.module.css'
import S_CoverData from './@PeminjamanHariIni/_Components/S_CoverData'
import S_CoverDataKendaraanDinas from './@ModalKendaraanDinas/_Components/Cover_KD/S_CoverDataKendaraanDinas'
import { ADMIN_READ_SEMUA_KENDARAAN_DINAS } from '@SchemaKD/schema_tb_kendaraan'

interface CMP_Container__inters {
    children: React.ReactNode,
    heads: string

}

function CMP_Container({ children, heads }: CMP_Container__inters) {
    return (
        <>
            <div className={LAKD['relative']} >

                <div className={`${LAKD['container']} ${LAKD['draw']}`}>
                    <h4 className={LAKD['container__head']} >{heads}</h4>
                    <div className={LAKD['overflow']}>
                        {children}
                    </div>
                </div>

            </div>

        </>
    )
}

export default async function page() {

    let DATA_HARI_INI = await ADMIN_READ_ALL_REGISTER("=")

    let DataSemuaKD = JSON.parse(await ADMIN_READ_SEMUA_KENDARAAN_DINAS())




    return (
        <>
            <div className={LAKD['outer_layout']}>
                <CMP_Container heads={"Data Kendaraan Dinas"} >
                    <S_CoverDataKendaraanDinas DataSemuaKD={DataSemuaKD} />
                </CMP_Container>

                <div className={LAKD['layout']}>

                    <CMP_Container heads={"Terpinjam Hari Ini"} >
                        <S_CoverData HARI_INI={DATA_HARI_INI} />
                    </CMP_Container>

                    <CMP_Container heads={"Jumlah Peminjaman Tahun Ini"} >
                        <></>
                    </CMP_Container>

                    <CMP_Container heads={"Jumlah Servis Bulan Ini"} >

                        <></>
                    </CMP_Container>

                    <CMP_Container heads={"Jumlah Servis Bulan Ini"} >
                        <></>
                    </CMP_Container>

                </div >
            </div>

            {/* <h3>Selamat Datang di Admin Page</h3>


            


            <p>
                Admin dapat memberikan status dikembalikan, agar mobil tersebut dapat dipinjam oleh orang lain lagi

                Admin dapat memberikan status Servis, agar mobil tersebut dapat terkunci dalam rangka Servis

                

                <br />
                STATISTIK

                Admin dapat melihat dan membuat laporan statistik mobil terpinjam dalam suatu bulan
            </p> */}
        </>
    )
}
