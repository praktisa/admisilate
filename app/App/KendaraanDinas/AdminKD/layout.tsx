
'use client'
import React, { useContext } from 'react'
import { Session } from '@/app/Auth/components/SessionContext/SessionContext'
import { useRouter } from 'next/navigation'
import LAKD from './layoutAdminKD.module.css'


interface children {
    children: React.ReactNode
    PeminjamanHariIni: React.ReactNode
}

interface Provider__Value__inter {
    [key: string]: string
}

interface CMP_Container__inter {
    children: React.ReactNode, head: string
}

export default function AdminKDLayout(child: children) {

    let Router = useRouter()
    let DataContext = useContext<Provider__Value__inter>(Session)
    let Require = "Subbagian Umum dan Kepatuhan Internal"

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


    if (DataContext['UNIT ORGANISASI'] === Require) {
        return (
            <>
                <div className={LAKD['layout']}>

                    <CMP_Container head={"Terpinjam Hari Ini"} >
                        {child.PeminjamanHariIni}
                    </CMP_Container>

                    <CMP_Container head={"Jumlah Terpinjam Bulan Ini"} >
                        {child.children}
                    </CMP_Container>

                    <CMP_Container head={"Jumlah Servis Bulan Ini"} >
                        {child.children}
                    </CMP_Container>

                    <CMP_Container head={"Jumlah Servis Bulan Ini"} >
                        {child.children}
                    </CMP_Container>

                </div >
            </>

        )
    } else {
        // Router.push('/App/KendaraanDinas/Daftar')
        Router.back()
        return (
            <>
                <h1>Page Not Found</h1>
            </>
        )

    }

}
