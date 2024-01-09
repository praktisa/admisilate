
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Riwayat Pinjam',
    description: 'Pinjam Mobil',
}

interface children {
    children: React.ReactNode
    RiwayatPinjam: React.ReactNode
}


export default function DaftarLayout(child: children) {



    return (
        <>
            {child.RiwayatPinjam}

            <h1 style={{ marginBottom: "20px" }}>Riwayat Peminjaman</h1>

            {child.children}


        </>


    )
}
