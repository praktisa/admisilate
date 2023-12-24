import React from 'react'
import MBC from './ModalBasicContainer.module.css'

interface ModalBasicContainer__inter {
    children: React.ReactNode
}

export default function ModalBasicContainer({ children }: ModalBasicContainer__inter) {



    return (
        <>
            <div className={MBC['area']} >
                <div className={MBC['container']}>
                    {children}
                </div>
            </div>




        </>
    )
}
