'use client'
import React, { useState, createContext } from 'react'
import { createPortal } from 'react-dom';
import Modals from '../../Modals/BasicModal/Modals';

interface PortalKonfirmation__inter {
    children: React.ReactNode,
    onOpen: React.ReactNode
}
// https://stackoverflow.com/questions/68434992/how-to-create-react-context-that-passes-a-function-with-typescript
export const ModalContext = createContext<{ Show: (value: boolean) => void }>({ Show: () => { } })

export default function PortalKonfirmation({ children, onOpen }: PortalKonfirmation__inter) {

    const [showModal, setShowModal] = useState<boolean>(false)



    return (
        <>
            <div onClick={() => setShowModal(true)} >{onOpen}</div>
            {showModal && createPortal(
                <Modals>
                    <ModalContext.Provider value={{ Show: setShowModal }}>
                        {children}
                    </ModalContext.Provider>
                </Modals>
                ,
                document.body
            )}
        </>
    )
}
