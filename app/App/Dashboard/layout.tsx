
import GET_USER from '@/app/Auth/action/function/GET_USER'
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Atrium',
    description: 'Dashboard',
}

interface children {
    children: React.ReactNode

}



export default async function DashLayout(props: children) {


    let User = await GET_USER()

    console.log("User", User)

    return (
        <>
            <div>
                <h2>Hallo</h2>
                {props.children}
            </div>
        </>


    )
}
