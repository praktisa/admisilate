'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import P from './Peminjaman.module.css'
import { PinjamMobilState } from '../Action/ActionPinjam'



import Kalender from '@/Global/Components/Kalender/KalenderCookie'
import { Container_Form, FormPeminjaman, GridTujuanLokasi, NamaKendaraan, SegmentForm, SubmitForm } from './S_Peminjaman'
import { useFormState } from 'react-dom'

export function ExitForm() {

    const router = useRouter()

    const Exit = useCallback(() => {
        router.back()
    }, [router])

    return (
        <div className={P['ExitForm']} onClick={() => Exit()}>&#x2715;</div>
    )
}


export function PeminjamanClientForm({ DataMobil }: { DataMobil: any }) {
    return (
        <>
            <Container_Form>
                <FormPeminjaman >
                    <input input-type="hidden" type="text" name="NAMA_MOBIL" defaultValue={DataMobil.STR_NAMA} />
                    <input input-type="hidden" type="text" name="ID_MOBIL" defaultValue={DataMobil.ID} />

                    <SegmentForm
                        label={"Pilih Tanggal"}
                        after={<SubmitForm />}
                        before={<label data-type="before" htmlFor='Tujuan dan Lokasi'>Sebelumnya</label>}
                    >
                        <Kalender terpinjam={DataMobil.OBJ_DATES_BOOKING} />
                    </SegmentForm>

                    <SegmentForm
                        label={"Tujuan dan Lokasi"}
                        after={<label data-type="after" htmlFor='Pilih Tanggal'>Lanjut</label>}
                    >
                        <GridTujuanLokasi />
                    </SegmentForm>

                </FormPeminjaman>


            </Container_Form>
            <ExitForm />
            <NamaKendaraan nama={DataMobil.STR_NAMA} />
        </>
    )
}

interface Child {
    children: React.ReactNode
    DataMobil: any
}



export function ClientFormPeminjaman({ children, DataMobil }: Child) {

    const [state, FormAction] = useFormState(PinjamMobilState, { sts: null, msg: "", update: {}, asd: {} })

    useEffect(() => {
        Notification.requestPermission().then(permission => {
            // alert(typeof permission)

            if (permission === "granted" && state.sts === true) {
                // console.log(permission)
                new Notification("Admisi | Kendaraan Dinas",
                    { body: state.msg }
                )
            }
        })
    }, [state])



    return (
        <form className={P['FormPeminjaman']} action={FormAction}>
            {children}

            {/* <input input-type="hidden" type="text" name="NAMA_MOBIL" defaultValue={DataMobil.STR_NAMA} />
            <input input-type="hidden" type="text" name="ID_MOBIL" defaultValue={DataMobil.ID} />

            <SegmentForm
                label={"Pilih Tanggal"}
                after={<SubmitForm />}
                before={<label data-type="before" htmlFor='Tujuan dan Lokasi'>Sebelumnya</label>}
            >
                <Kalender terpinjam={DataMobil.OBJ_DATES_BOOKING} />
            </SegmentForm>

            <SegmentForm
                label={"Tujuan dan Lokasi"}
                after={<label data-type="after" htmlFor='Pilih Tanggal'>Lanjut</label>}
            >
                <GridTujuanLokasi />
            </SegmentForm> */}


        </form>
    )
}