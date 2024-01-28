
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
                <h1>Hallo</h1>
                <h2>{User['NAMA PEGAWAI']} &#128075;</h2>
                {props.children}
            </div>
        </>


    )
}
