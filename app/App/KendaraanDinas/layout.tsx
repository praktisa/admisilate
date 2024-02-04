import type { Metadata } from 'next'
import LayoutNavigation from './_Components/LayoutNavigation'
import GET_USER from '@/app/Auth/action/function/GET_USER'
import { READ_COUNT_PEMINJAMAN_MOBIL_BY_SESSION } from './_Schema/schema_tb_kendaraan_status'
import LN from './_Components/LayoutNavigation.module.css'
export const metadata: Metadata = {
    title: 'Admisi | TURT',
    description: 'Daftar Kendaraan Dinas',
}

interface children {
    children: React.ReactNode

}


export default async function KendaraanDinasLayout(child: children) {

    let role = await GET_USER()

    let JumlahRiwayat = await READ_COUNT_PEMINJAMAN_MOBIL_BY_SESSION()


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
            <LayoutNavigation role={role} Menu={Menu}>
                {child.children}
            </LayoutNavigation>
        </>


    )
}

function CounterContainer({ Count }: { Count: number }) {

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