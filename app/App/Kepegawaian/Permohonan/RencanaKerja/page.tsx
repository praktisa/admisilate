import Image from 'next/image'
import React from 'react'
import FormRK from './_Components/FormRK'
import FETCH_GET_IMG from '@/app/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_IMG/fetch'
import Action_Kirim_RencanaKerja from '../@modalRencanaKerja/(.)RencanaKerja/Action/Action_Kirim_RencanaKerja'
import PortalNotification from '@/Global/Components/Portal/PortalNotification/PortalNotification'


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
