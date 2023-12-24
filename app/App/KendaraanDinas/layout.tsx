// import Layout_KendaraanDinas from '@/content/KendaraanDinas/S_KendaraanDinas'
import type { Metadata } from 'next'
import LayoutNavigation from './_Components/LayoutNavigation'

export const metadata: Metadata = {
    title: 'Admisi | TURT',
    description: 'Daftar Kendaraan Dinas',
}

interface children {
    children: React.ReactNode

}


export default function KendaraanDinasLayout(child: children) {



    return (
        <>
            <LayoutNavigation>
                {child.children}
            </LayoutNavigation>
        </>


    )
}
