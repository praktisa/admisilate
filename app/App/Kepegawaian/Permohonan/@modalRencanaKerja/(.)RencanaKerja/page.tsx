import Image from 'next/image'
import React from 'react'
import TestAnimation from '../../_Components/TestAnimation/TestAnimation'

export default function page() {
    return (
        <>
            <Image
                src={`/Kepegawaian/Permohonan/RencanaKerja.svg`}
                fill
                alt={"src"}
                quality={90}
                style={{ objectFit: "cover" }}
            />
            {/* <TestAnimation /> */}
        </>
    )
}
