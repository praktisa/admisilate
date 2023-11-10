'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AKD from './Peminjaman.module.css'
// import { PinjamMobilState } from '../Action/ActionPinjam'


import { useFormState } from 'react-dom'

export function ExitForm() {

    const router = useRouter()

    const Exit = useCallback(() => {
        router.back()
    }, [router])

    return (
        <div className={AKD['ExitForm']} onClick={() => Exit()}>&#x2715;</div>
    )
}


export function ClientAKDForm({ DataMobil }: { DataMobil: any }) {
    return (
        <>
            <div className={AKD["Layout_Form"]}>
                <div className={AKD['Layout__Identity']} >
                    <input type="text" className="NamaMobil" />
                    <input type="text" className="PlatMobil" />
                    <input type="text" className="Pengadaan" />
                </div>


            </div>
        </>
    )
}

interface Child {
    children: React.ReactNode
    DataMobil: any
}



export function ClientFormAdminKD({ children, DataMobil }: Child) {

    // const [state, FormAction] = useFormState(PinjamMobilState, { sts: null, msg: "", update: {}, asd: {} })

    // useEffect(() => {
    //     Notification.requestPermission().then(permission => {
    //         // alert(typeof permission)

    //         if (permission === "granted" && state.sts === true) {
    //             // console.log(permission)
    //             new Notification("Admisi | Kendaraan Dinas",
    //                 { body: state.msg }
    //             )
    //         }
    //     })
    // }, [state])



    return (
        // <form className={P['FormPeminjaman']} action={FormAction}>
        //     {children}


        // </form>
        <>
        </>
    )
}