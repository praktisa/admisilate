
import React, { ReactNode } from 'react'

import Blur from './Blur/Blur'
import ModalContainer from './Container/BlurContainer'


interface Inter__Modals {
    children: ReactNode
}

export default function Modals({ children }: Inter__Modals) {


    return (
        <>
            <Blur>

                {children}

            </Blur>
        </>
    )
}
