
import type { Metadata } from 'next'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'
import { Container_Interception } from '../../@modal/(.)peminjaman/[dk]/components/S_Peminjaman'
import Modals from '@/Global/Components/Modals/BasicModal/Modals'

export const metadata: Metadata = {
    title: 'Admisi | TURT',
    description: 'Pinjam Kendaraan Dinas',
}

interface children {
    children: React.ReactNode
    params: any
}


export default function ModalPeminjamanLayout(props: children) {

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
