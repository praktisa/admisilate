import React from 'react'
import LN from './LayoutNavigation.module.css'
import C_NavContainer from '@/Global/Components/Navigator/v1/C_NavContainer'
import { READ_COUNT_PEMINJAMAN_MOBIL_BY_SESSION } from '../_Schema/schema_tb_kendaraan_status'
import GET_USER from '@/app/Auth/action/function/GET_USER'

interface LayoutNavigation_inter {
    children: React.ReactNode
}

export default async function LayoutNavigation({ children }: LayoutNavigation_inter) {

    let JumlahRiwayat = await READ_COUNT_PEMINJAMAN_MOBIL_BY_SESSION()

    let role = await GET_USER()


    let Menu: any = [
        {
            display: "Admin",
            link: "/App/KendaraanDinas/AdminKD",
            role: "Subbagian Umum dan Kepatuhan Internal"

        },
        {
            display: "Daftar",
            link: "/App/KendaraanDinas/Daftar"

        },
        {
            display: "Riwayat",
            link: "/App/KendaraanDinas/Riwayat",
            count: <CounterContainer Count={JumlahRiwayat} />
        }


    ]

    return (
        <>
            <div className={LN['Layout']}>
                <div className={LN['Layout__Nav']}>
                    <C_NavContainer Menu={Menu} role={role} />
                </div>

                <div className={LN['Layout__Content']}>
                    {children}
                </div>
            </div>
        </>
    )
}

export function CounterContainer({ Count }: { Count: number }) {

    return (
        <>
            <div className={LN['Nav__Counter']} >
                <div className={LN['Counter']}>
                    {Count}
                </div>
            </div>
        </>
    )
}