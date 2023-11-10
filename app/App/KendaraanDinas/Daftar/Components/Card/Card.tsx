import React from 'react'
import C from './Card.module.css'
import ImageFill from '../Image/ImageFill'


interface Card__Inter {
    name: string, plat: string, img: string
}

export default function Card({ name, plat, img }: Card__Inter) {



    return (
        <>
            <div className={C['Container']}>
                <div className={C['Container__Image']}>
                    <ImageFill
                        src={img}
                        animated={false}
                        hover={true}
                        quality={40}

                    />

                    <div className={C['Container__Info']}>
                        {name}
                    </div>
                </div>

            </div>


        </>
    )
}

export function CardGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className={C['CardGrid']}>
            {children}
        </div>
    )
}