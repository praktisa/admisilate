import React from 'react'
import Modals from '@/Global/Components/Modals/BasicModal/Modals'
//import { ADMIN_READ_ALL_REGISTER } from '../../../Daftar/@modal/(.)peminjaman/[dk]/Action/Register_CRUD'
import { S_TableData } from '../_Components/S_TableData'

import { ADMIN_READ_ALL_REGISTER } from '@SchemaKD/schema_tb_kendaraan_register'


export default async function MonitoringMobilAdminpage() {

    let DATA_SEMUA = await ADMIN_READ_ALL_REGISTER(">=")


    return (
        <>
            <Modals>
                <S_TableData DATA={DATA_SEMUA} />
            </Modals>
        </>


    )
}


