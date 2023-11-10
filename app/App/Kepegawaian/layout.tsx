
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Admisi | TURT',
    description: 'Kepegawaian',
}

interface children {
    children: React.ReactNode

}



export default function KepegawaianLayout(props: children) {

    // console.log("params from layout", props)

    return (
        <>
            <div>
                {props.children}
            </div>
        </>


    )
}
