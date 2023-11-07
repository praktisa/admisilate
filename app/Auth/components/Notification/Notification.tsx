'use client'
import React from 'react'
import N from './Notification.module.css'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'

import { useFormState, useFormStatus } from "react-dom";

export default function Notification() {

    const Status = useFormStatus()

    console.log("Status", Status)


    return (
        <>
            {/* ${status === 1 && N['Founded']} */}
            {/* ${status === -1 && N['notFound']} */}

            <div className={`
            ${N['NotifStructure']} 
        
            `}
            >
                {/* {User} */}
            </div>

            {
                Status.pending === true
                    ?
                    <Shimerloading loop={0} />
                    :
                    <></>
            }

        </>

    )
}
