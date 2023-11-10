// 'use client'
import { Session } from '@/app/Auth/components/SessionContext/SessionContext'
// import Notifikasi from '@/Global/Notifikasi/Notifikasi'
import Link from 'next/link'
import React, { useContext } from 'react'

interface Provider__Value__inter {
    [key: string]: string
}


export default function AdminKendaraanDinasPage() {

    // let DataContext = useContext<Provider__Value__inter>(Session)



    // let Disp = ""

    // if (DataContext) {
    //     if (DataContext['UNIT ORGANISASI'] === "Subbagian Umum dan Kepatuhan Internal") {
    //         Disp = "block"
    //     } else {
    //         Disp = "none"
    //     }
    // }


    // console.log("DataContext", DataContext, Disp)
    return (
        <>
            {/* <div style={{ display: Disp }}> */}
            <div>ini adalah Admin Pagi</div>

            <div>monitoring pemesanan mobil</div>
            <div>(daftar Mobil) Penambahan dan servis mobil</div>
            {/* </div> */}


        </>
    )
}
