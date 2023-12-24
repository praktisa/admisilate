
import React from 'react'

import S_AddForm from '../@ModalKendaraanDinas/_Components/Add_KD/S_AddForm'
import { ActionAddMobil } from '../@ModalKendaraanDinas/(.)DataKendaraanDinas/Action/ActionAddMobil'
import PortalNotification from '@/Global/Components/Portal/PortalNotification/PortalNotification'


export default async function DataKendaraanDinasPage() {



    return (
        <>
            <PortalNotification>
                <S_AddForm ActionAdd={ActionAddMobil} />
            </PortalNotification>

        </>
    )
}
