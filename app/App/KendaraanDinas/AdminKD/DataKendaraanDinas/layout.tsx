import Modals from '@/Global/Components/Modals/BasicModal/Modals'
import type { Metadata } from 'next'
import ModalBasicContainer from '@/Global/Components/Modals/BasicModal/ModalBasicContainer/ModalBasicContainer'
import DKDL from '../@ModalKendaraanDinas/(.)DataKendaraanDinas/DKDLayout.module.css'
import C_BackPage from '../@ModalKendaraanDinas/_Components/C_BackPage'
export const metadata: Metadata = {
    title: 'Admisi | TURT',
    description: 'Admin Monitoring Mobil',
}

interface children {
    children: React.ReactNode

}



export default function DKDLayout(props: children) {


    return (
        <>
            <Modals>
                <div className={DKDL['area']} >

                    <div className={DKDL['back']} >
                        <C_BackPage>&#x2715;</C_BackPage>
                    </div>

                    <div className={DKDL['container']}>

                        {props.children}
                    </div>
                </div>
            </Modals>
        </>


    )
}
