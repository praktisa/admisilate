'use client'
import React, { useState, createContext, useEffect } from 'react'
import { createPortal } from 'react-dom';
import PN from './PortalNotification.module.css'
import Image from 'next/image';
import Shimerloading from '../../Loading/Shimerloading';


interface ModalNotification__child__inter {
    children: React.ReactNode,

}


interface ModalNotification__inter {
    Open: boolean
    Status: boolean
    Title: string
    Desc: string
}


// https://stackoverflow.com/questions/68434992/how-to-create-react-context-that-passes-a-function-with-typescript
export const ModalNotification_Context = createContext<{ ShowNotif: (value: ModalNotification__inter) => void, Open: boolean }>({ ShowNotif: () => { }, Open: false })

export default function PortalNotification({ children }: ModalNotification__child__inter) {

    const [showModal, setShowModal] = useState<ModalNotification__inter>({ Open: false, Status: false, Title: "", Desc: "" })


    useEffect(() => {
        let Success = new Audio("/music/Success.wav")
        let Fail = new Audio("/music/Fail.wav")

        if (showModal.Open === true) {
            if (showModal.Status === true) {
                // console.log("Memunculkan Notifikasi Sukses")
                Success.play()
            } else if (showModal.Status === false) {
                // console.log("Memunculkan Notifikasi Gagal")
                Fail.play()
            }
        }

    }, [showModal])




    return (
        <>

            {showModal.Open === true && createPortal(

                <div className={PN['Position']}>
                    <div className={`${PN['Container']}`}>
                        {
                            showModal.Status === false
                                ?
                                <>
                                    <Structure_Notification
                                        onClose={() => setShowModal({ Open: false, Status: false, Title: "", Desc: "" })}
                                        Title={showModal.Title}
                                        Desc={showModal.Desc}
                                        Status={showModal.Status}
                                    />

                                </>
                                :
                                <>
                                    <Structure_Notification
                                        onClose={() => setShowModal({ Open: false, Status: true, Title: "", Desc: "" })}
                                        Title={showModal.Title}
                                        Desc={showModal.Desc}
                                        Status={showModal.Status}
                                    />
                                </>
                        }
                    </div>
                </div>
                ,
                document.body
            )
            }

            <ModalNotification_Context.Provider value={{ ShowNotif: setShowModal, Open: showModal.Open }}>
                {children}
            </ModalNotification_Context.Provider>

        </>
    )
}


function Structure_Notification({ onClose, Title, Desc, Status }: { onClose: any, Title: string, Desc: string, Status: boolean }) {
    return (
        <>

            <div className={PN['Relative']} >
                <Shimerloading loop={1} />
                <div className={PN['Grid']} >

                    <div className={PN['Grid__Img']}>
                        <div className={`${PN['circle']} ${Status === true ? PN['pulseSuccess'] : PN['pulseFail']}`} >
                            <Image src={Status === true ? '/gc.svg' : '/xc.svg'} alt={Title} width={40} height={40} />
                        </div>

                    </div>

                    <div className={PN['Grid__Body']}>
                        <div className={PN['Grid__Title']}>
                            <h3>{Title}</h3>
                        </div>

                        <div className={PN['Grid__Desc']}>
                            <small>{Desc}</small>
                        </div>
                    </div>

                    <div className={PN['Grid__Close']} onClick={onClose} >
                        <div className={PN['Close']}  >&#x2715;</div>
                    </div>

                </div>
            </div>
        </>
    )
}
