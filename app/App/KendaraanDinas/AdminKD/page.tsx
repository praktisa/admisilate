import React from 'react'

// import { ADMIN_READ_ALL_REGISTER } from '../Daftar/@modal/(.)peminjaman/[dk]/Action/Register_CRUD' 
import { ADMIN_READ_ALL_REGISTER } from '@SchemaKD/schema_tb_kendaraan_register'
import LAKD from './layoutAdminKD.module.css'
import S_CoverData from './@PeminjamanHariIni/_Components/S_CoverData'
import S_CoverDataKendaraanDinas from './@ModalKendaraanDinas/_Components/Cover_KD/S_CoverDataKendaraanDinas'
import { ADMIN_READ_SEMUA_KENDARAAN_DINAS } from '@SchemaKD/schema_tb_kendaraan'

interface CMP_Container__inter {
    children: React.ReactNode, head: string

}

export default async function page() {

    let DATA_HARI_INI = await ADMIN_READ_ALL_REGISTER("=")

    let DataSemuaKD = JSON.parse(await ADMIN_READ_SEMUA_KENDARAAN_DINAS())


    function CMP_Container({ children, head }: CMP_Container__inter) {
        return (
            <>
                <div className={LAKD['relative']} >

                    <div className={`${LAKD['container']} ${LAKD['draw']}`}>
                        <h4 className={LAKD['container__head']} >{head}</h4>
                        <div className={LAKD['overflow']}>
                            {children}
                        </div>
                    </div>

                </div>

            </>
        )
    }

    return (
        <>
            <div className={LAKD['outer_layout']}>
                <CMP_Container head={"Data Kendaraan Dinas"} >
                    <S_CoverDataKendaraanDinas DataSemuaKD={DataSemuaKD} />
                </CMP_Container>

                <div className={LAKD['layout']}>

                    <CMP_Container head={"Terpinjam Hari Ini"} >
                        <S_CoverData HARI_INI={DATA_HARI_INI} />
                    </CMP_Container>

                    <CMP_Container head={"Jumlah Peminjaman Tahun Ini"} >
                        <></>
                    </CMP_Container>

                    <CMP_Container head={"Jumlah Servis Bulan Ini"} >

                        <></>
                    </CMP_Container>

                    <CMP_Container head={"Jumlah Servis Bulan Ini"} >
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
