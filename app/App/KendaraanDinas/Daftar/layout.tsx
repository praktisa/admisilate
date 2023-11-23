// import Layout_KendaraanDinas from '@/content/KendaraanDinas/S_KendaraanDinas'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Mobil Dinas',
    description: 'Pinjam Mobil',
}

interface children {
    children: React.ReactNode
    modal: React.ReactNode
}


export default function DaftarLayout(child: children) {



    return (
        <>
            {child.modal}
            {child.children}
        </>


    )
}
