
import React from 'react'
import GET_USER from '@/app/Auth/action/function/GET_USER'


interface children {
    children: React.ReactNode,
    // PeminjamanHariIni: React.ReactNode,
    // ModalKendaraanDinas: React.ReactNode
}



export default async function AdminKDLayout(child: children) {

    // let Router = useRouter()
    let RolePegawai = await GET_USER()
    let Require = "Subbagian Umum dan Kepatuhan Internal"

    if (RolePegawai['UNIT ORGANISASI'] === Require) {
        return (
            <>
                {/* {child.ModalKendaraanDinas}

                {child.PeminjamanHariIni} */}
                <h1>Admin Kepegawaian</h1>
                {child.children}

            </>

        )
    } else {
        // Router.push('/App/KendaraanDinas/Daftar')
        // Router.back()
        return (
            <>
                <h1>Page Not Found</h1>
            </>
        )

    }

}
