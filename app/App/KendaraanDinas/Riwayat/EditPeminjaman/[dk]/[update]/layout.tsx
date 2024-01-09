import Modals from '@/Global/Components/Modals/BasicModal/Modals'
import type { Metadata } from 'next'

import { Container_Interception } from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/components/S_Peminjaman'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'

export const metadata: Metadata = {
    title: 'Atrium | TURT',
    description: 'Pinjam Kendaraan Dinas',
}

interface children {
    children: React.ReactNode
    params: any
}



export default function EditPeminjamanLayout(props: children) {

    return (
        <>

            <Modals>
                <Container_Interception>
                    <Shimerloading loop={1} />
                    {props.children}
                </Container_Interception>
            </Modals>

        </>


    )
}
