'use client'
import { useFormState, useFormStatus } from 'react-dom'
import React, { useCallback, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

import { useRouter } from 'next/navigation'
import P from './Peminjaman.module.css'




import Kalender from '@/Global/Components/Kalender/KalenderCookie'
// const Kalender = dynamic(() => import('@/Global/Components/Kalender/KalenderCookie'), {
//     ssr: false,
// })

import { GridTujuanLokasi, LoadingSubmit, SegmentForm, SubmitForm } from './S_Peminjaman'
import LabelArea from '@/Global/Components/Input/_Label/TextArea/LabelArea'



export function ExitForm() {

    const router = useRouter()

    const Exit = useCallback(() => {
        router.back()
    }, [router])

    return (
        <div className={P['ExitForm']} onClick={() => Exit()}>&#x2715;</div>
    )
}


interface Child {
    DataMobil: any
    ServerAction: any
    UpdateData?: any
}

interface TextArea__Inter {
    label: string
    rows?: number
    editValue?: string
}



export function ClientFormPeminjaman({ ServerAction, DataMobil, UpdateData }: Child) {

    let initialState = {
        success: null,
        HeadMsg: "",
        BodyMsg: ""
    }


    const [state, FormAction] = useFormState(ServerAction, initialState)


    // handle validasi Input
    const RefTujuan = useRef<HTMLTextAreaElement | null>(null)
    const RefLokasi = useRef<HTMLTextAreaElement | null>(null)

    function CheckInput() {
        if (RefTujuan.current && RefLokasi.current) {
            let LabelNext = document.getElementById('Label_Next')

            if (LabelNext) {
                if (RefLokasi.current.value.length > 3 && RefTujuan.current?.value.length > 3) {
                    LabelNext.style.display = "grid"
                } else {
                    LabelNext.style.display = "none"
                }
            }
        }
    }

    useEffect(() => {
        if (RefTujuan.current && RefLokasi.current) {
            if (RefTujuan.current.value.length > 3 && RefLokasi.current.value.length > 3) {
                let LabelNext = document.getElementById('Label_Next')
                if (LabelNext) {
                    LabelNext.style.display = "grid"
                }
            }
        }
    }, [UpdateData])




    const router = useRouter()
    router.prefetch('/App/KendaraanDinas/Riwayat')

    const PindahKe_RiwayatMobil = useCallback(() => {
        router.push('/App/KendaraanDinas/Riwayat', { scroll: false })
    }, [router])


    Notification.requestPermission().then(permission => {
        if (permission === "granted" && state.success === true) {
            console.log("permission", permission)
            new Notification(state.HeadMsg,
                { body: state.BodyMsg }
            )
        }
    })
        .then(() => {
            if (state.success === true) {
                // setInterval(() => {
                PindahKe_RiwayatMobil()
                // }, 1000)
            }
        })




    return (
        <form className={P['FormPeminjaman']} action={FormAction}>

            {
                UpdateData
                    ?
                    <>
                        <input input-type="hidden" type="text" name="TGL_BEFORE" value={UpdateData.STR_TGL} />
                        <input input-type="hidden" type="text" name="ID_PINJAM" value={UpdateData.ID_STATUS} />
                    </>

                    :
                    <></>
            }

            <input input-type="hidden" type="text" name="NAMA_MOBIL" defaultValue={DataMobil.STR_NAMA} />
            <input input-type="hidden" type="text" name="ID_MOBIL" defaultValue={DataMobil.ID} />

            <SegmentForm
                label={"Tujuan dan Lokasi"}
                after={<SubmitFormStatus UpdateData={UpdateData} />}
                before={<label data-type="before" htmlFor='Pilih Tanggal'>Sebelumnya</label>}
            >

                <LabelArea htmlFor={"Area " + "Tujuan Penggunaan"} label={"Tujuan Penggunaan"} >
                    <textarea rows={1}
                        ref={RefTujuan}
                        onKeyUp={() => CheckInput()}

                        spellCheck="false"
                        id={"Area " + "Tujuan Penggunaan"}
                        placeholder={``}
                        name={"Tujuan Penggunaan"}
                        defaultValue={UpdateData ? UpdateData.STR_TUJUAN : ""}
                        required
                    >
                        {/* {editValue} */}
                    </textarea>
                </LabelArea>

                <LabelArea htmlFor={"Area " + "Lokasi Kegiatan"} label={"Lokasi Kegiatan"} >
                    <textarea rows={1}
                        ref={RefLokasi}
                        onKeyUp={() => CheckInput()}

                        spellCheck="false"
                        id={"Area " + "Lokasi Kegiatan"}
                        placeholder={``}
                        name={"Lokasi Kegiatan"}
                        defaultValue={UpdateData ? UpdateData.STR_TEMPAT : ""}
                        required
                    >
                        {/* {editValue} */}
                    </textarea>
                </LabelArea>

            </SegmentForm>

            <SegmentForm
                label={"Pilih Tanggal"}
                after={<label data-type="after" htmlFor='Tujuan dan Lokasi'>Lanjut</label>}
            >
                <GridTujuanLokasi >


                    <KalenderLoadingStatus
                        terpinjam={DataMobil.OBJ_DATES_BOOKING}
                        loadmsg={"Mengubah Peminjaman Mobil " + DataMobil.STR_NAMA}
                        UpdateData={UpdateData}
                    />

                </GridTujuanLokasi>
            </SegmentForm>


        </form>
    )
}



export function SubmitFormStatus({ UpdateData }: { UpdateData?: any }) {

    const status = useFormStatus();

    let isPending = status.pending === true ? true : false

    // console.log("useFormStatus", status)

    return (

        <SubmitForm disabled={isPending} Value={UpdateData ? "Ubah" : "Pinjam"} />
    )
}

export function KalenderLoadingStatus({ terpinjam, loadmsg, UpdateData }: { terpinjam: any, loadmsg: string, UpdateData: any }) {

    const status = useFormStatus();

    let isPending = status.pending === true ? true : false

    // let isPending = false

    return (
        <>
            {
                isPending
                    ?
                    <LoadingSubmit msg={loadmsg} />
                    :
                    <Kalender
                        terpinjam={terpinjam}
                        editValue={UpdateData ? JSON.parse(UpdateData.STR_TGL) : []}
                    />
            }
        </>
    )
}