
import React from 'react'
import { ADMIN_READ_ALL_REGISTER } from '../../Daftar/@modal/(.)peminjaman/[dk]/Action/Register_CRUD'
import Modals from '@/Global/Components/Modals/BasicModal/Modals'
import { S_TableData } from '../@PeminjamanHariIni/_Components/S_TableData'



export default async function MonitoringMobilAdminpage() {

    let DATA_SEMUA = await ADMIN_READ_ALL_REGISTER(">=")


    return (
        <>


            <Modals>
                <div> Dari Page Biasa</div>

                <S_TableData DATA={DATA_SEMUA} />
            </Modals>
        </>


    )
}


