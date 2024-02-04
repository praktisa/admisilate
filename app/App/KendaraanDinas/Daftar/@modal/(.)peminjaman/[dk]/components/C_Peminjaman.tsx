'use client'
import React, { useCallback, useRef, useEffect, useContext } from 'react'
import dynamic from 'next/dynamic'

import { useRouter } from 'next/navigation'
import P from './Peminjaman.module.css'
// import Kalender from '@/Global/Components/Kalender/KalenderCookie'

const Kalender = dynamic(() => import('@/Global/Components/Kalender/KalenderCookie'), { ssr: false, loading: () => <LoadingTanggal />, })

import { Container_Form, GridTujuanLokasi, NamaKendaraan, SegmentForm, SubmitForm } from './S_Peminjaman'
import LabelArea from '@/Global/Components/Input/_Label/TextArea/LabelArea'
import { ModalNotification_Context } from '@/Global/Components/Portal/PortalNotification/PortalNotification'
import ImageFill from '../../../../Components/Image/ImageFill'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'

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
    From: string
}

export function LoadingTanggal() {
    return (
        <>
            <Shimerloading loop={0} />
            <div className={P['LoadingTanggal']}>
                <h2>Memuat Tanggal ...</h2>
            </div>
        </>
    )
}


export function ClientFormPeminjaman({ ServerAction, DataMobil, UpdateData, From }: Child) {

    // handle validasi Input
    const RefTujuan = useRef<HTMLTextAreaElement | null>(null)
    const RefLokasi = useRef<HTMLTextAreaElement | null>(null)
    const RefPin = useRef<HTMLInputElement | null>(null)

    const router = useRouter()

    const NotificationToggle = useContext(ModalNotification_Context)

    console.log("UpdateData", UpdateData)

    function CheckInput() {
        if (RefTujuan.current && RefLokasi.current
            // && RefPin.current
        ) {
            let LabelNext = document.getElementById('Label_Next')

            if (LabelNext) {
                if (RefLokasi.current.value.length > 3 && RefTujuan.current?.value.length > 3
                    // && RefPin.current?.value.length > 5
                ) {

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


    async function PinjamMobilAction(form: FormData, ServerAction: any) {

        await ServerAction(form)
            .then((res: any) => {

                if (res['sebagian'] === true) {
                    NotificationToggle.ShowNotif({ Open: true, Status: true, Title: "Berhasil Sebagian", Desc: "Menuju Pemilihan Alternatif" })

                    let Inter = setInterval(() => {
                        NotificationToggle.ShowNotif({ Open: false, Status: true, Title: "", Desc: "" })



                        clearInterval(Inter)
                    }, 500)


                } else {
                    NotificationToggle.ShowNotif({ Open: true, Status: true, Title: "Berhasil", Desc: `Berhasil ${UpdateData ? "mengubah" : "meminjam"} mobil` })

                    if (From === 'Intercepting') {
                        router.back()
                    } else {
                        router.push('/App/KendaraanDinas/Daftar')
                    }

                }


            })
            .catch((error: any) => {
                console.log("Error", error)
                NotificationToggle.ShowNotif({ Open: true, Status: false, Title: "Server Error", Desc: `Gagal ${UpdateData ? "mengubah" : "meminjam"} mobil` })
            })

    }

    return (
        <>

            <Container_Form>
                <form className={P['FormPeminjaman']} action={(form) => PinjamMobilAction(form, ServerAction)}>

                    {
                        UpdateData
                            ?
                            <>
                                <input input-type="hidden" type="text" name="TGL_BEFORE" defaultValue={UpdateData.STR_TGL} />
                                <input input-type="hidden" type="text" name="ID_PINJAM" defaultValue={UpdateData.ID_STATUS} />
                            </>
                            :
                            <></>
                    }

                    <input input-type="hidden" type="text" name="NAMA_MOBIL" defaultValue={DataMobil.STR_NAMA} />
                    <input input-type="hidden" type="text" name="ID_MOBIL" defaultValue={DataMobil.ID} />

                    <SegmentForm
                        label={"Tujuan dan Lokasi"}
                        after={
                            <SubmitForm disabled={NotificationToggle.Open} Value={UpdateData ? "Ubah" : "Pinjam"} />
                        }
                        before={<label data-type="before" htmlFor='Pilih Tanggal'>Sebelumnya</label>}
                    >
                        <div style={{ display: "grid", gridTemplateRows: "0.5fr 0.5fr 0.01fr", gap: "10px" }}>
                            <LabelArea htmlFor={"Area " + "Tujuan Penggunaan"} label={"Tujuan Penggunaan"} >
                                <textarea rows={1}
                                    ref={RefTujuan}
                                    onKeyUp={() => CheckInput()}
                                    spellCheck="false"
                                    id={"Area " + "Tujuan Penggunaan"}
                                    placeholder={``}
                                    name={"Tujuan Penggunaan"}
                                    defaultValue={UpdateData ? UpdateData.STR_TUJUAN : ""}
                                    disabled={NotificationToggle.Open}
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
                                    disabled={NotificationToggle.Open}
                                    required
                                >
                                    {/* {editValue} */}
                                </textarea>
                            </LabelArea>


                            {/* <StyledInput forId='VARCHAR_PIN' label="PIN Ubah (6 digit)" >
                                            <input
                                                ref={RefPin}
                                                placeholder=''
                                                type="password"
                                                name="VARCHAR_PIN"
                                                id='VARCHAR_PIN'
                                                onKeyUp={() => CheckInput()}
                                                required
                                                maxLength={6} />
                                        </StyledInput> */}
                        </div>


                    </SegmentForm>

                    <SegmentForm
                        label={"Pilih Tanggal"}
                        after={<label data-type="after" htmlFor='Tujuan dan Lokasi'>Lanjut</label>}
                    >
                        <GridTujuanLokasi >
                            <Kalender
                                terpinjam={DataMobil.OBJ_DATES_BOOKING}
                                editValue={UpdateData ? JSON.parse(UpdateData.STR_TGL) : []}
                            />
                        </GridTujuanLokasi>
                    </SegmentForm>
                </form>

            </Container_Form>

            <ExitForm />

            <NamaKendaraan nama={DataMobil.STR_NAMA} />
            <ImageFill src={DataMobil.BLOB_IMG} animated hover={false} quality={75} />

        </>

    )
}
