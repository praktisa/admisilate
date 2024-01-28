// import Layout_KendaraanDinas from '@/content/KendaraanDinas/S_KendaraanDinas'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mobil Dinas',
    description: 'Pinjam Mobil',
}

interface children {
    children: React.ReactNode
    modalRencanaKerja: React.ReactNode
}


export default function PermohonanLayout(child: children) {



    return (
        <>
            {child.modalRencanaKerja}
            {child.children}
        </>


    )
}
