// import Layout_KendaraanDinas from '@/content/KendaraanDinas/S_KendaraanDinas'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Admisi | TURT',
    description: 'Kendaraan Dinas',
}

interface children {
    children: React.ReactNode
    

}


export default function AdminKendaraanDinasLayout(child: children) {

    

    return (
        <>

            <h1>Admin Kendaraan Dinas</h1>

            {child.children}

            
            


        </>


    )
}
