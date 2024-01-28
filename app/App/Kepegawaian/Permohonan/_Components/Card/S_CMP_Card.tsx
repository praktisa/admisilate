import React from 'react'
import SC from './S_CMP_Card.module.css'
import Image from 'next/image'
import TestAnimation from '../TestAnimation/TestAnimation'

interface S_CMP_Card {
    children: React.ReactNode
    photo: string
}

export default function S_CMP_Card({ children, photo }: S_CMP_Card) {
    return (
        <>
            <div className={SC['Transparent__Container']}>
                <div className={SC['Background__Container__position']}>

                </div>

                <div className={SC['Container__Grid']}>
                    <div className={SC['Grid__Area__Img']}>
                        <Image
                            src={`/Kepegawaian/Permohonan/${photo}`}
                            fill
                            alt={"src"}
                            quality={80}
                            className={SC['Img']}
                        />
                    </div>

                    <div className={SC['Grid__Area__Text']}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
