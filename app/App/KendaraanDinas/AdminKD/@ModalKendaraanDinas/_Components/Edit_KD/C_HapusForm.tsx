'use client'
import React, { useContext, useState } from 'react'

import CHF from './C_HapusForm.module.css'
import C_Structure from '@/Global/Components/CTA/C_Structure'

import PortalKonfirmation, { ModalContext } from '@/Global/Components/Portal/PortalKonfirmation/PortalKonfirmation'
import { ModalNotification_Context } from '@/Global/Components/Portal/PortalNotification/PortalNotification'

import S_ModalDelete from './S_ModalDelete'
import { useRouter } from 'next/navigation'
import FETCH_DELETE_ID_MOBIL from '../../../DataKendaraanDinas/api/HapusMobil/fetch'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'

export default function C_HapusForm({ Data }: { Data: any }) {

    const { ID, STR_NAMA } = Data
    const NotificationToggle = useContext(ModalNotification_Context)

    const [LoadingProcess, setLoadingProcess] = useState<boolean>(false)
    const [LoadMSG, setLoadMSG] = useState("Menghapus")
    const router = useRouter()



    async function MobilDelete(ID_MOBIL: string,) {
        setLoadingProcess(true)

        await FETCH_DELETE_ID_MOBIL(ID_MOBIL).then(async (res) => {


            let Hasil = await res.json()

            console.log("RESPONSE FETCH_DELETE_ID_MOBIL", Hasil)

            if (Hasil === "Berhasil") {
                setLoadMSG(Hasil)

                NotificationToggle.ShowNotif({ Open: true, Status: true, Title: "Berhasil", Desc: "Berhasil Hapus Mobil" })

                let Inter = setInterval(() => {
                    router.back()

                    clearInterval(Inter)
                }, 500)

            } else {
                NotificationToggle.ShowNotif({ Open: true, Status: false, Title: "Server Error", Desc: "Gagal Hapus Mobil" })
                setLoadingProcess(false)
            }


        }).then(() => {
            setLoadingProcess(false)

        })
    }

    function ButtonDelete() {
        return (
            <C_Structure style={LoadMSG != "Berhasil" ? "danger" : "success"} onClick={() => MobilDelete(ID)} >
                {LoadingProcess === true ? <Shimerloading loop={0} /> : <></>}
                {LoadingProcess === true ? LoadMSG : "Hapus"}
            </C_Structure>
        )
    }

    return (
        <>
            <div className={CHF['Position']}>

                <PortalKonfirmation
                    onOpen={
                        <>
                            <C_Structure style={"danger"}  >
                                Hapus
                            </C_Structure>
                        </>
                    }
                >

                    <S_ModalDelete

                        batal={<Konfirmation_Batal LoadingProcess={LoadingProcess} />}
                        hapus={<ButtonDelete />}
                        mobil={STR_NAMA}
                    />

                </PortalKonfirmation>

            </div>

        </>
    )
}



export function Konfirmation_Batal({ LoadingProcess }: { LoadingProcess: boolean }) {

    const BatalToggle = useContext(ModalContext)
    // console.log("BatalToggle", BatalToggle.Show, ModalContext)

    return (
        <>
            <C_Structure
                onClick={() => { LoadingProcess === true ? null : BatalToggle.Show(false) }}
                style="outlined"
            >
                Batal
            </C_Structure>

        </>
    )
}