
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Admisi | TURT',
    description: 'Kepegawaian',
}

interface children {
    children: React.ReactNode
    params: any
}



export default function ModalPeminjamanLayout(props: children) {

    // console.log("params from layout", props)

    return (
        <>

            {props.children}


        </>


    )
}
