
import type { Metadata } from 'next'
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


export default function ModalPeminjamanAlternatifLayout(props: children) {

    return (
        <>
            <Modals>
                <Container_Interception>
                    {props.children}
                </Container_Interception>
            </Modals>
        </>


    )
}
