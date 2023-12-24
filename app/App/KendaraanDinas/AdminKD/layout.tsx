
'use client'
import React, { useContext } from 'react'
import { Session } from '@/app/Auth/components/SessionContext/SessionContext'
import { useRouter } from 'next/navigation'



interface children {
    children: React.ReactNode,
    PeminjamanHariIni: React.ReactNode,
    ModalKendaraanDinas: React.ReactNode
}

interface Provider__Value__inter {
    [key: string]: string
}


export default function AdminKDLayout(child: children) {

    let Router = useRouter()
    let DataContext = useContext<Provider__Value__inter>(Session)
    let Require = "Subbagian Umum dan Kepatuhan Internal"



    if (DataContext['UNIT ORGANISASI'] === Require) {
        return (
            <>
                {child.ModalKendaraanDinas}

                {child.PeminjamanHariIni}

                {child.children}

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
