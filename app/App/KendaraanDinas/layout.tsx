// import Layout_KendaraanDinas from '@/content/KendaraanDinas/S_KendaraanDinas'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Admisi | TURT',
    description: 'Kendaraan Dinas',
}

interface children {
    children: React.ReactNode
    DaftarKendaraanDinas: React.ReactNode
    modal: React.ReactNode

}

// Riwayat Pararel
// Pinjam Intercept

export default function KendaraanDinasLayout(child: children) {

    // console.log("props", child)

    return (
        <>

            {child.modal}

            <h1>Kendaraan Dinas</h1>

            {child.children}

            <div> Daftar </div>
            {child.DaftarKendaraanDinas}


        </>


    )
}
