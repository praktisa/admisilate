
import React from 'react'
import Modals from '@/Global/Components/Modals/BasicModal/Modals'
import { S_TableData } from '../@PeminjamanHariIni/_Components/S_TableData'

import FETCH_ADMIN_READ_ALL_REGISTER from './Action/api/FETCH_ADMIN_READ_ALL_REGISTER/fetch'



export default async function MonitoringMobilAdminpage() {

    let DATA_SEMUA = await FETCH_ADMIN_READ_ALL_REGISTER(">=")


    return (
        <>


            <Modals>

                <S_TableData DATA={DATA_SEMUA} />
            </Modals>
        </>


    )
}


