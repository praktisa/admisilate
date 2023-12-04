import Modals from '@/Global/Components/Modals/BasicModal/Modals'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Admisi | TURT',
    description: 'Admin Monitoring Mobil',
}

interface children {
    children: React.ReactNode
    params: any
}



export default function ModalMonitoring(props: children) {


    return (
        <>

            <Modals>

                {props.children}

            </Modals>

        </>


    )
}
