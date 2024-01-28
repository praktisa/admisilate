import Modals from '@/Global/Components/Modals/BasicModal/Modals'
import type { Metadata } from 'next'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'
import { Container_Interception } from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/components/S_Peminjaman'


export const metadata: Metadata = {
    title: 'Atrium | Rencana Kerja',
    description: 'Pembuatan Rencana Kerja',
}

interface children {
    children: React.ReactNode
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
