import React from 'react'
import LN from './LayoutNavigation.module.css'
import C_NavContainer from '@/Global/Components/Navigator/v1/C_NavContainer'

interface LayoutNavigation_inter {
    children: React.ReactNode
}

export default function LayoutNavigation({ children }: LayoutNavigation_inter) {

    let Menu: any = [
        {

            display: "Daftar",
            link: "/App/KendaraanDinas/Daftar"
        },
        {

            display: "Riwayat",
            link: "/App/KendaraanDinas/Riwayat"
        },

    ]

    return (
        <>
            <div className={LN['Layout']}>
                <div className={LN['Layout__Nav']}>
                    <C_NavContainer Menu={Menu} />
                </div>

                <div className={LN['Layout__Content']}>
                    {children}
                </div>
            </div>
        </>
    )
}
