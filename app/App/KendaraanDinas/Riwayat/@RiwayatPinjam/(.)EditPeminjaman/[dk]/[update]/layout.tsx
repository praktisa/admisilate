import Modals from '@/Global/Components/Modals/BasicModal/Modals'
import type { Metadata } from 'next'

import { Container_Interception } from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/components/S_Peminjaman'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'

import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '@SchemaKD/schema_tb_kendaraan_status'
import ImageFill from '@/app/App/KendaraanDinas/Daftar/Components/Image/ImageFill'

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