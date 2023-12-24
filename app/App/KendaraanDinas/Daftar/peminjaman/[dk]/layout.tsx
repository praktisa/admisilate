
import type { Metadata } from 'next'

import Shimerloading from '@/Global/Components/Loading/Shimerloading'
// import ImageFill from '../../../@DaftarKendaraanDinas/Components/Image/ImageFill'

// import { READ_KENDARAAN_DINAS_BY_ID, READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '../../../@DaftarKendaraanDinas/Action/CRUD/DaftarKD_CRUD'
import ImageFill from '../../Components/Image/ImageFill'
import { READ_SEMUA_KENDARAAN_DINAS_ONLY_ID } from '../../Action/CRUD/DaftarKD_CRUD'

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


            <Shimerloading loop={1} />
            {props.children}


        </>


    )
}
