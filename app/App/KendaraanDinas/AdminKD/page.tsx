
import React from 'react'

import { ADMIN_READ_ALL_REGISTER } from '../Daftar/@modal/(.)peminjaman/[dk]/Action/Register_CRUD'
import LAKD from './layoutAdminKD.module.css'
import S_CoverData from './@PeminjamanHariIni/_Components/S_CoverData'

interface CMP_Container__inter {
    children: React.ReactNode, head: string

}

export default async function page() {

    let DATA_HARI_INI = await ADMIN_READ_ALL_REGISTER("=")


    function CMP_Container({ children, head }: CMP_Container__inter) {
        return (
            <>
                <div className={LAKD['relative']} >
                    <div className={`${LAKD['container']} ${LAKD['draw']}`}>
                        <h4 className={LAKD['container__head']} >{head}</h4>
                        {children}
                    </div>
                </div>

            </>
        )
    }

    return (
        <>



            <div className={LAKD['layout']}>

                <CMP_Container head={"Terpinjam Hari Ini"} >
                    <S_CoverData HARI_INI={DATA_HARI_INI} />
                </CMP_Container>

                <CMP_Container head={"Jumlah Terpinjam Bulan Ini"} >
                    {/* {child.children} */}
                </CMP_Container>

                <CMP_Container head={"Jumlah Servis Bulan Ini"} >

                    {/* {child.children} */}
                </CMP_Container>

                <CMP_Container head={"Jumlah Servis Bulan Ini"} >
                    {/* {child.children} */}
                </CMP_Container>

            </div >
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
