'use client'
import { useFormStatus } from "react-dom";
import React from 'react'
import Structure from '@/Global/Components/CTA/Structure'
import Shimerloading from "@/Global/Components/Loading/Shimerloading";



interface C_ButtonForm__inter {
    htmlFor: string
    TUJUAN: string
}

export default function C_ButtonForm({ htmlFor, TUJUAN }: C_ButtonForm__inter) {

    const status = useFormStatus();

    // console.log("status status", status)




    return (
        <>
            <label htmlFor={status.pending === false ? htmlFor : "X"}>
                <Structure style={
                    status.pending === false ?
                        TUJUAN === "Digunakan Umum (Mandatory)" ? "success" : "danger"
                        :
                        "outlined"

                }>
                    {status.pending === true ? <Shimerloading loop={0} /> : <></>}


                    {
                        status.pending === false ?
                            TUJUAN === "Digunakan Umum (Mandatory)" ? "Kembalikan" : "Mandatory"
                            :
                            "Proses"
                    }
                </Structure>
            </label>
        </>
    )
}
