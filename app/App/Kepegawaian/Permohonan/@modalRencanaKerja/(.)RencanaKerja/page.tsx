import Image from 'next/image'
import React from 'react'
// import TestAnimation from '../../_Components/TestAnimation/TestAnimation'
import PortalNotification from '@/Global/Components/Portal/PortalNotification/PortalNotification'
import FETCH_GET_IMG from '@/app/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_IMG/fetch'
import FormRK from '../../RencanaKerja/_Components/FormRK'
import Action_Kirim_RencanaKerja from './Action/Action_Kirim_RencanaKerja'

export default async function page() {

    let DataAlternatif_IMG = await FETCH_GET_IMG()
    return (
        <>
            <PortalNotification>
                <Image
                    src={`/Kepegawaian/Permohonan/RencanaKerja.svg`}
                    fill
                    alt={"RencanaKerja"}
                    quality={90}
                    style={{ objectFit: "cover" }}
                    priority
                />

                <FormRK ImgMobil={DataAlternatif_IMG} ServerAction={Action_Kirim_RencanaKerja} />
            </PortalNotification>
        </>
    )
}
