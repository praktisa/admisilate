
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Atrium | Kepegawaian',
    description: 'Kepegawaian',
}

interface children {
    children: React.ReactNode

}


export default async function KepegawaianLayout(props: children) {



    return (
        <>
            <div>
                {props.children}
            </div>
        </>


    )
}
