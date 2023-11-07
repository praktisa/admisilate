import Modals from '@/Global/Components/Modals/BasicModal/Modals'
import type { Metadata } from 'next'
import { Container_Interception } from './components/S_Peminjaman'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'
import ImageFill from '../../../@DaftarKendaraanDinas/Components/Image/ImageFill'

import { READ_KENDARAAN_DINAS_BY_ID, READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '../../../@DaftarKendaraanDinas/Action/CRUD/DaftarKD_CRUD'

export const metadata: Metadata = {
    title: 'Admisi | TURT',
    description: 'Pinjam Kendaraan Dinas',
}

interface children {
    children: React.ReactNode
    params: any
}



export default function ModalPeminjamanLayout(props: children) {

    // console.log("params from layout", props)

    return (
        <>

            <Modals>
                <Container_Interception>
                    <Shimerloading loop={1} />
                    {props.children}

                    <ImageFill
                        src={props.params.dk}
                        animated={true}
                        hover={false}
                        quality={90}
                    />

                </Container_Interception>
            </Modals>

        </>


    )
}

export async function generateStaticParams() {
    const ListDK = await READ_SEMUA_KENDARAAN_DINAS_ONLY_ID()

    return ListDK.map((dk: any) => ({
        dk: dk.ID,
    }))
}