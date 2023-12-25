'use client'
import React, { Fragment, useCallback, useRef, useEffect, useContext, useState } from 'react'

import { useRouter } from 'next/navigation'
import P from './Peminjaman.module.css'
import Kalender from '@/Global/Components/Kalender/KalenderCookie'
import { GridTujuanLokasi, SegmentForm, SubmitForm } from './S_Peminjaman'
import LabelArea from '@/Global/Components/Input/_Label/TextArea/LabelArea'
import { ModalNotification_Context } from '@/Global/Components/Portal/PortalNotification/PortalNotification'


   
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

interface ShowAlternate__inter{
    status:boolean,
    tgl_terpesan:string[],
    str_tujuan:string,
    str_lokasi:string  
}


export function ClientFormPeminjaman({ ServerAction, DataMobil, UpdateData }: Child) {

    // handle validasi Input
    const RefTujuan = useRef<HTMLTextAreaElement | null>(null)
    const RefLokasi = useRef<HTMLTextAreaElement | null>(null)

    const [ShowAlternate, setShowAlternate] = useState<ShowAlternate__inter>({
        status:false,
        tgl_terpesan:[],
        str_tujuan:"",
        str_lokasi:""
    })
    

    const NotificationToggle = useContext(ModalNotification_Context)

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



    async function PinjamMobilAction(form: FormData, ServerAction: any) {

        await ServerAction(form)
            .then((res: any) => {

                if (res[1].length > 0) {
                    NotificationToggle.ShowNotif({ Open: true, Status: true, Title: "Berhasil Sebagian", Desc: "Sebagian tanggal telah dibooking" })

                    let Inter = setInterval(() => {
                        NotificationToggle.ShowNotif({ Open: false, Status: true, Title: "", Desc: "" })
                        setShowAlternate(true)

                        clearInterval(Inter)
                    }, 500)


                } else {
                    NotificationToggle.ShowNotif({ Open: true, Status: true, Title: "Berhasil", Desc: "Berhasil meminjam mobil" })


                }


            })
            .catch((error: any) => {
                console.log("Error", error)
                NotificationToggle.ShowNotif({ Open: true, Status: false, Title: "Server Error", Desc: "Gagal meminjam mobil" })
            })

    }



    return (
        <>
            {
                ShowAlternate.status === false

                    ?
                    <AlternateMobil tgl_terpesan={[]} />
                    :
                    <form className={P['FormPeminjaman']} action={(form) => PinjamMobilAction(form, ServerAction)}>

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
                            after={
                                <SubmitForm disabled={NotificationToggle.Open} Value={UpdateData ? "Ubah" : "Pinjam"} />
                            }
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
            }

        </>

    )
}

interface AlternateMobil__inter{
    tgl_terpesan: string[]
}

// pertimbangkan untuk dijadikan pararel page baru 
export function AlternateMobil({tgl_terpesan}: AlternateMobil__inter) {

    // coba gunakan useState untuk pergantian tanggal dengan nilai string tgl terpesan


    return (
        <>
            <div className={P['Alternate__position']} >
                <div className={P['Alternate__container']}>
                    <div className={P['Container__head']} >
                        <h3>Sebagian tanggal telah dipesan</h3>
                        <h4>Berikut adalah alternatif mobil yang tersedia:</h4>
                    </div>
                    <div className={P['Container__nav']} >

                        <div className={P['Nav__alternate']} >
                            Semua
                        </div>

                        {
                            tgl_terpesan.map((tgl:string, i:number)=>{
                                return(
                                    <Fragment key={tgl}>
                                        <div className={P['Nav__alternate']} >{tgl}</div>
                                    </Fragment>
                                )
                            })
                        }
                    </div>

                    <div className={P['Container__mobil']} >
                        
                    </div>

                    
                </div>
            </div>
        </>
    )
}