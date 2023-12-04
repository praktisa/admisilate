// import React from 'react'
// import { ADMIN_READ_ALL_REGISTER } from '../../../Daftar/@modal/(.)peminjaman/[dk]/Action/Register_CRUD'
// import { TableData } from '../_Components/C_CoverPinjam'
// import FETCH_GET_ADMIN_RIWAYAT from '../../../Riwayat/Action/api/AdminGetRiwayat/fetch'

// export default async function MonitoringMobilAdminpage() {
//     // let DATA_SEMUA = await ADMIN_READ_ALL_REGISTER(">=")

//     let DATA_SEMUA = await FETCH_GET_ADMIN_RIWAYAT().then((res) => {
//         return res.json()
//     })

//     console.log("FETCH_GET_ADMIN_RIWAYATTTTT", DATA_SEMUA)


//     return (

//         <TableData DATA={DATA_SEMUA} />
//     )
// }


import React from 'react'
// import { ADMIN_READ_ALL_REGISTER } from '../../Daftar/@modal/(.)peminjaman/[dk]/Action/Register_CRUD'
import Modals from '@/Global/Components/Modals/BasicModal/Modals'
// import { S_TableData } from '../@PeminjamanHariIni/_Components/S_TableData'
// import { Action_Ambil_Alih } from '../../monitoring/Action/AmbilAlihAction'
import { ADMIN_READ_ALL_REGISTER } from '../../../Daftar/@modal/(.)peminjaman/[dk]/Action/Register_CRUD'
import { S_TableData } from '../_Components/S_TableData'


export default async function MonitoringMobilAdminpage() {

    let DATA_SEMUA = await ADMIN_READ_ALL_REGISTER(">=")


    return (
        <>
            <Modals>
                <div>HAI ini dari Intercept</div>

                <S_TableData DATA={DATA_SEMUA} />
            </Modals>
        </>


    )
}


