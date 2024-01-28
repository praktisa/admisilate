import Image from 'next/image'
import React from 'react'
import FormRK from './_Components/FormRK'
import FETCH_GET_IMG from '@/app/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_IMG/fetch'



export default async function page() {

    let DataAlternatif_IMG = await FETCH_GET_IMG()

    return (
        <>

            <Image
                src={`/Kepegawaian/Permohonan/RencanaKerja.svg`}
                fill
                alt={"RencanaKerja"}
                quality={90}
                style={{ objectFit: "cover" }}
                priority
            />
            <FormRK ImgMobil={DataAlternatif_IMG} />
        </>

    )

}
