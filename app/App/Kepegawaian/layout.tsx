
import type { Metadata } from 'next'
import LayoutNavigation from '../KendaraanDinas/_Components/LayoutNavigation'
import GET_USER from '@/app/Auth/action/function/GET_USER'


export const metadata: Metadata = {
    title: 'Atrium | Kepegawaian',
    description: 'Kepegawaian',
}

interface children {
    children: React.ReactNode;
}


export default async function KepegawaianLayout(child: children) {

    let role = await GET_USER()

    let Menu: any = [
        {
            display: "Admin",
            link: "/App/Kepegawaian/AdminKepeg",
            role: "Subbagian Umum dan Kepatuhan Internal"

        },
        {
            display: "Permohonan",
            link: "/App/Kepegawaian/Permohonan"

        },
        {
            display: "Informasi",
            link: "/App/Kepegawaian/Informasi",
            // count: <CounterContainer Count={JumlahRiwayat} />
        },
        {
            display: "Latihan Ujian",
            link: "/App/Kepegawaian/LatihanUjian",
            // count: <CounterContainer Count={JumlahRiwayat} />
        },



    ]

    console.log("props KepegawaianLayout CEK", child)

    return (
        <>

            <LayoutNavigation role={role} Menu={Menu}>
                {child.children}
            </LayoutNavigation>


        </>


    )
}
