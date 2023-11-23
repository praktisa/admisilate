// import Layout_KendaraanDinas from '@/content/KendaraanDinas/S_KendaraanDinas'
import type { Metadata } from 'next'
import S_TabelRiwayat from './_Component/S_TabelRiwayat'

export const metadata: Metadata = {
    title: 'Riwayat Pinjam',
    description: 'Pinjam Mobil',
}

interface children {
    children: React.ReactNode
    RiwayatPinjam: React.ReactNode
}


export default function DaftarLayout(child: children) {

    // console.log("DaftarLayout", child)

    return (
        <>
            {child.RiwayatPinjam}

            <h1 style={{ marginBottom: "20px" }}>Riwayat Peminjaman</h1>
            <S_TabelRiwayat>
                {child.children}
            </S_TabelRiwayat>

        </>


    )
}
