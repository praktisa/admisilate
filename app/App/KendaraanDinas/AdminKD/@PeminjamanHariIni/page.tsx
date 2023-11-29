
import React from 'react'
import { ADMIN_READ_ALL_REGISTER } from '../../Daftar/@modal/(.)peminjaman/[dk]/Action/Register_CRUD'
import C_CoverPinjam from './_Components/C_CoverPinjam'




export default async function PeminjamanHariInipage() {

    let DATA_SEMUA = await ADMIN_READ_ALL_REGISTER(">=")
    let DATA_HARI_INI = await ADMIN_READ_ALL_REGISTER("=")

    // console.log("DATA_HARI_INI", DATA_HARI_INI)

    return (
        <>
            <C_CoverPinjam DATA={DATA_SEMUA} HARI_INI={DATA_HARI_INI} />
        </>
    )
}
