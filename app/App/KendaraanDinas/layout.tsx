// import Layout_KendaraanDinas from '@/content/KendaraanDinas/S_KendaraanDinas'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Admisi | TURT',
    description: 'Daftar Kendaraan Dinas',
}

interface children {
    children: React.ReactNode

}

// Riwayat Pararel
// Pinjam Intercept

export default function KendaraanDinasLayout(child: children) {

    // console.log("props", child)

    return (
        <>
            {child.children}
        </>


    )
}
