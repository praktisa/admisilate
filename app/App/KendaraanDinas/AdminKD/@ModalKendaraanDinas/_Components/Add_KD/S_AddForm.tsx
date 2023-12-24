'use client'
import React, { useContext, useRef } from 'react'

import FAKD from '../FormAdminKD.module.css'

import StyledInput from '@/Global/Components/Input/Styled/StyledInput'
import C_UploadForm from '../Add_KD/C_UploadForm'
import C_FormSubmit from './C_AddFormSubmit'

import { ModalNotification_Context } from '@/Global/Components/Portal/PortalNotification/PortalNotification'
import { useRouter } from 'next/navigation'

export default function S_AddForm({ ActionAdd }: { ActionAdd: any }) {

    const Router = useRouter()
    const NotificationToggle = useContext(ModalNotification_Context)

    const DOM_PLAT = useRef<HTMLDivElement>(null)


    async function ActionAddData(formData: FormData, ActionAdd: any) {

        await ActionAdd(formData).then((res: any) => {

            let res_parse = JSON.parse(res)

            if (res_parse.includes("Duplicate")) {
                NotificationToggle.ShowNotif({ Open: true, Status: false, Title: "Gagal", Desc: "Plat Mobil Sudah Terdaftar" })


            } else {
                NotificationToggle.ShowNotif({ Open: true, Status: true, Title: "Berhasil", Desc: "Berhasil Menambahkan Mobil" })

                let Inter = setInterval(() => {
                    Router.back()

                    clearInterval(Inter)
                }, 500)
            }


        }).then(() => {
            (DOM_PLAT.current?.style as CSSStyleDeclaration).borderRadius = "4px";
            (DOM_PLAT.current?.style as CSSStyleDeclaration).border = "1px solid #f22613"


        }).catch((Error: any) => {

            console.log("Error", Error)
            NotificationToggle.ShowNotif({ Open: true, Status: false, Title: "Server Error", Desc: "Gagal Menambahkan Mobil" })
            Router.back()

        })
    }

    return (
        <>

            <h3 className={FAKD['Form__Title']} >
                Tambah Kendaraan
            </h3>

            <form
                className={FAKD['Form__Action']}
                action={(form) => ActionAddData(form, ActionAdd)}
            >

                <div className={FAKD['Layout__Form']} >

                    <div className={FAKD['Layout__Form__Img']}>

                        <label htmlFor='BLOB_IMG'>
                            <C_UploadForm />
                        </label>

                    </div>

                    <div className={FAKD['Layout__Input']}>
                        <div className={FAKD['Form']} >
                            <StyledInput label="Nama Kendaraan" forId="STR_NAMA" withBorder={true}>
                                <input type="text" name="STR_NAMA" id="STR_NAMA" placeholder='' autoComplete='off' required />
                            </StyledInput>
                        </div>

                        <div className={FAKD['Form']} ref={DOM_PLAT}>
                            <StyledInput label="Plat Kendaraan" forId="STR_PLAT" withBorder={true}>
                                <input type="text" name="STR_PLAT" id="STR_PLAT" placeholder='' autoComplete='off' required />
                            </StyledInput>
                        </div>


                        <div className={FAKD['Form']} >
                            <div className={FAKD['Form__radio']}>
                                <div>
                                    <input className={FAKD['radio']} input-type="hidden" type="radio" name="STR_JENIS" id="Mobil" defaultValue="Mobil" defaultChecked={true} />
                                    <label htmlFor='Mobil'>Mobil</label>
                                </div>
                                <div>
                                    <input className={FAKD['radio']} input-type="hidden" type="radio" name="STR_JENIS" id="Motor" defaultValue="Motor" />
                                    <label htmlFor='Motor'>Motor</label>
                                </div>
                            </div>

                        </div>

                        <div className={FAKD['Form']} >

                            <C_FormSubmit
                                placeholder="Tambah Mobil"
                                loadingstate="Menambahkan"
                                isLoad={NotificationToggle.Open}
                            />

                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
