import Modals from '@/Global/Components/Modals/BasicModal/Modals'
import type { Metadata } from 'next'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'
import Custom_Interception from '../../_Components/Interception/Custom_Interception'


export const metadata: Metadata = {
    title: 'Atrium | Rencana Kerja',
    description: 'Pembuatan Rencana Kerja',
}

interface children {
    children: React.ReactNode
    params: any
}



export default function ModalRKLayout(props: children) {



    return (
        <>
            <Modals>
                <Custom_Interception>
                    <Shimerloading loop={1} />
                    {props.children}
                </Custom_Interception>
            </Modals>
        </>


    )
}
