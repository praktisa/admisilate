'use client'

import React, { useContext, useRef } from 'react'


import FAKD from '../FormAdminKD.module.css'

import StyledInput from '@/Global/Components/Input/Styled/StyledInput'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'
import C_HapusForm from './C_HapusForm'
import C_UploadForm from '../Add_KD/C_UploadForm'
import C_FormSubmit from '../Add_KD/C_AddFormSubmit'

import PortalNotification, { ModalNotification_Context } from '@/Global/Components/Portal/PortalNotification/PortalNotification'
import { useRouter } from 'next/navigation'

export default function S_EditForm({ Data, ActionUpdateMobil }: { Data: any, ActionUpdateMobil: any }) {

    let { ID, STR_PLAT, STR_NAMA, BLOB_IMG, STR_JENIS } = Data

    const NotificationToggle = useContext(ModalNotification_Context)

    const Router = useRouter()

    const DOM_PLAT = useRef<HTMLDivElement>(null)

    async function ActionUbahData(formData: FormData, ActionUpdateMobil: any) {

        await ActionUpdateMobil(formData).then((res: any) => {

            let res_parse = res

            console.log("res_parse", res_parse)

            if (res_parse === "Duplicate") {


                console.log("Show Duplicate")
                NotificationToggle.ShowNotif({ Open: true, Status: false, Title: "Gagal", Desc: "Plat Mobil Sudah Terdaftar" })


            } else if (res_parse === "Berhasil") {
                NotificationToggle.ShowNotif({ Open: true, Status: true, Title: "Berhasil", Desc: "Berhasil Mengubah Mobil" })

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
            NotificationToggle.ShowNotif({ Open: true, Status: false, Title: "Server Error", Desc: "Gagal Mengubah Mobil" })
            Router.back()

        })
    }

    return (
        <>
            <h3 className={FAKD['Form__Title']} >Ubah Kendaraan</h3>

            <form className={FAKD['Form__Action']} action={(form) => ActionUbahData(form, ActionUpdateMobil)} >
                <input input-type="hidden" type='text' defaultValue={ID} name={"ID_LAMA"} />
                <div className={FAKD['Layout__Form']} >

                    <div className={FAKD['Layout__Form__Img']}>

                        <PortalNotification>
                            <C_HapusForm Data={Data} />
                        </PortalNotification>


                        <label htmlFor='BLOB_IMG'>
                            <Shimerloading loop={1} />

                            <C_UploadForm CurrentData={BLOB_IMG} />
                        </label>

                    </div>

                    <div className={FAKD['Layout__Input']}>
                        <div className={FAKD['Form']} >
                            <StyledInput label="Nama Kendaraan" forId="STR_NAMA" withBorder={true}>
                                <input type="text" name="STR_NAMA" id="STR_NAMA" placeholder='' defaultValue={STR_NAMA} autoComplete='off' required />
                            </StyledInput>
                        </div>

                        <div className={FAKD['Form']} ref={DOM_PLAT} >
                            <StyledInput label="Plat Kendaraan" forId="STR_PLAT" withBorder={true}>
                                <input type="text" name="STR_PLAT" id="STR_PLAT" placeholder='' defaultValue={STR_PLAT} autoComplete='off' required />
                            </StyledInput>
                        </div>


                        <div className={FAKD['Form']} >
                            <div className={FAKD['Form__radio']}>
                                <div>
                                    <input className={FAKD['radio']} input-type="hidden" type="radio" name="STR_JENIS" id="Mobil" defaultValue="Mobil" defaultChecked={STR_JENIS === "Mobil" ? true : false} />
                                    <label htmlFor='Mobil'>Mobil</label>
                                </div>
                                <div>
                                    <input className={FAKD['radio']} input-type="hidden" type="radio" name="STR_JENIS" id="Motor" defaultValue="Motor" defaultChecked={STR_JENIS === "Motor" ? true : false} />
                                    <label htmlFor='Motor'>Motor</label>
                                </div>
                            </div>

                        </div>

                        <div className={FAKD['Form']} >

                            <C_FormSubmit
                                placeholder="Ubah Mobil"
                                loadingstate="Mengubah"
                                isLoad={NotificationToggle.Open}
                            />



                        </div>

                    </div>



                </div>





            </form>
        </>
    )
}
