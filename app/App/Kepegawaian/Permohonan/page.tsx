import React from 'react'
import S_CMP_GridNav from './_Components/Grid/S_CMP_GridNav'
import S_CMP_Card from './_Components/Card/S_CMP_Card'
import Link from 'next/link'

export default function Permohonanpage() {
    return (
        <>
            <h1>Permohonan</h1>

            <S_CMP_GridNav>
                <Link href={'/App/Kepegawaian/Permohonan/RencanaKerja'}>
                    <S_CMP_Card photo={"RencanaKerja.svg"}>Permohonan Rencana Kerja</S_CMP_Card>
                </Link>


                {/* <S_CMP_Card photo={"RencanaKerja.svg"}>Permohonan SIK</S_CMP_Card> */}
                <S_CMP_Card photo={"SPD_SIK.svg"}>Permohonan SPD / SIK</S_CMP_Card>
                <S_CMP_Card photo={"Test.svg"}>Permohonan Dokumen Kepegawaian</S_CMP_Card>
            </S_CMP_GridNav>

        </>

    )
}
