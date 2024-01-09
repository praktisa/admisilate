'use client'

import React, { Fragment, useEffect, useState, useContext } from 'react'
import SA from './S_AlternateMobil.module.css'
import Structure from '@/Global/Components/CTA/Structure'
import StyledInput from '@/Global/Components/Input/Styled/StyledInput'
import ImageFill from '../../../../Components/Image/ImageFill'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'
import { ModalNotification_Context } from '@/Global/Components/Portal/PortalNotification/PortalNotification'

import { useRouter } from 'next/navigation'

interface C_AlternateMobilForm__inter {
    tgl_terpesan: string[]
    str_tujuan: string,
    str_lokasi: string,
    id_alternatif: string,

    mobil_alternatif: any
    mobil_img: any
    ActionPinjamMobilAlternate: any
}

interface Alternate_KD_Option__inter {
    Head: string,
    KD: any,
    Img: any
}

export function CorrectDisplayData(StringDate: string) {
    let NewDate = new Date(StringDate)

    let TGL = NewDate.getDate()
    let BLN = NewDate.getMonth() + 1
    let THN = NewDate.getFullYear()

    let STR = `${TGL}-${BLN}-${THN}`

    return STR
}

export function Alternate_KD_Option({ Head, KD, Img }: Alternate_KD_Option__inter) {



    function Pick_Alternate_KD(tgl: string, STR_NAMA: string, ID: string) {

        if (tgl === "Semua") {
            let SemuaInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('[select-semua="Semua"]')
            let IDSemuaInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('[select-semua="SemuaID"]')

            console.log("SemuaInput", SemuaInput)
            for (var i = 0; i < SemuaInput.length; i++) {
                SemuaInput[i].value = STR_NAMA
                IDSemuaInput[i].value = ID
            }

        } else {

            let TglInput = document.getElementById(tgl) as HTMLInputElement
            let ID_TglInput = document.getElementById(tgl + " id_kd") as HTMLInputElement

            console.log("TglInput", TglInput)

            TglInput.value = STR_NAMA
            ID_TglInput.value = ID
        }
    }

    console.log("Function Ready")

    return (
        <>
            <div className={SA['Container__Group']} >

                <div className={SA['Group__Head']}  >
                    <h3 className={SA['Head']} >
                        {Head != "Semua" ? `${CorrectDisplayData(Head) + " - Parsial"}` : Head}
                    </h3>
                </div>

                <div className={SA['Group__Mobil']} >
                    {

                        KD.map((knda: any, i: any) => {

                            let IMG_Filter = Img.filter((IM: any) => {
                                return IM.ID === knda.ID
                            })

                            return (
                                <Fragment key={Head + "Card" + knda.ID}>
                                    <label htmlFor={Head + knda.ID}>

                                        <input
                                            input-type={"hidden"}
                                            id={Head + knda.ID}
                                            type="radio"
                                            name={Head}
                                            value={knda.ID}
                                            className={SA['Card__Check']}
                                            onChange={() => Pick_Alternate_KD(Head, knda.STR_NAMA, knda.ID)}
                                        />
                                        <div className={SA['Card__container']}>

                                            <div className={SA['Card__Img']}>
                                                <ImageFill
                                                    src={IMG_Filter[0].BLOB_IMG}
                                                    animated={false}
                                                    hover={false}
                                                    quality={100}
                                                />
                                            </div>

                                            <div className={SA['Card__Name']}>
                                                {knda.STR_NAMA}
                                            </div>

                                        </div>
                                    </label>

                                </Fragment>
                            )
                        })
                    }
                </div>

            </div>
        </>
    )
}

export default function C_AlternateMobilForm({ tgl_terpesan, str_tujuan, str_lokasi, id_alternatif, mobil_alternatif, mobil_img, ActionPinjamMobilAlternate }: C_AlternateMobilForm__inter) {


    const NotificationToggle = useContext(ModalNotification_Context)



    let Key = Object.keys(mobil_alternatif)
    let Value = Object.values(mobil_alternatif)
    const [Ready, setReady] = useState<boolean>(false)
    const Router = useRouter()


    async function Func_Pinjam_Alternate_Mobil(form: FormData, ServerAction: any) {

        await ServerAction(form)
            .then((res: any) => {

                if (res['sebagian'] === true) {
                    NotificationToggle.ShowNotif({ Open: true, Status: true, Title: "Berhasil Sebagian", Desc: "Menuju Pemilihan Alternatif" })

                    Router.replace(`/App/KendaraanDinas/Daftar/peminjaman_alternatif/${res['id_alternate']}`)


                } else {
                    NotificationToggle.ShowNotif({ Open: true, Status: true, Title: "Berhasil", Desc: "Berhasil meminjam mobil" })

                    Router.replace(`/App/KendaraanDinas/Riwayat`)
                }


            })
            .catch((error: any) => {
                console.log("Error", error)
                NotificationToggle.ShowNotif({ Open: true, Status: false, Title: "Server Error", Desc: "Gagal meminjam mobil" })

                let Inter = setInterval(() => {
                    NotificationToggle.ShowNotif({ Open: false, Status: true, Title: "", Desc: "" })
                    clearInterval(Inter)
                }, 700)

            })

    }

    useEffect(() => {
        if (document.readyState === 'complete') {
            setReady(true)
        }
    }, [])

    return (
        <>
            <div className={SA['Container__Process']} >
                <h1>Sebagian tanggal telah dipesan</h1>
                <blockquote>Pilih Kendaraan Dinas disamping untuk mengisi form dibawah</blockquote>

                <form action={(form) => Func_Pinjam_Alternate_Mobil(form, ActionPinjamMobilAlternate)} className={SA['Process__date']}>


                    <div className={SA['date__input']} >

                        {
                            tgl_terpesan.map((tgl: string, i: number) => {
                                return (
                                    <Fragment key={tgl}>


                                        <div className={SA['Nav__alternate']} >
                                            <StyledInput label={CorrectDisplayData(tgl)} forId={tgl} withBorder={true} >
                                                <input
                                                    select-semua="Semua"
                                                    select-tgl={tgl}

                                                    id={tgl}
                                                    type="text"
                                                    name={"STR_NAMA_KENDARAAN"}
                                                    placeholder=""
                                                    readOnly
                                                    // disabled
                                                    disabled={NotificationToggle.Open}
                                                    required={true}
                                                />

                                            </StyledInput>
                                        </div>

                                        <input
                                            type="text"
                                            select-semua="SemuaID"

                                            input-type="hidden"
                                            id={tgl + " id_kd"}
                                            name={"STR_ID_KENDARAAN"}
                                        />


                                    </Fragment>
                                )
                            })
                        }
                    </div>

                    <label htmlFor='Reset'>
                        <Structure style={"outlined"}>
                            Reset
                        </Structure>
                    </label>

                    <button type='submit' disabled={NotificationToggle.Open} >
                        <Structure style={"containedCenter"}>
                            {
                                NotificationToggle.Open === true
                                    ?
                                    <>
                                        <Shimerloading loop={0} />
                                        Meminjam
                                    </>
                                    :
                                    <>
                                        Pinjam
                                    </>
                            }
                        </Structure>
                    </button>

                    <input input-type="hidden" type="reset" value="Reset" id={"Reset"} disabled={NotificationToggle.Open} />

                    <input
                        type="text"
                        input-type="hidden"
                        name={"STR_TUJUAN"}
                        defaultValue={str_tujuan}
                    />
                    <input
                        type="text"
                        input-type="hidden"
                        name={"STR_TEMPAT"}
                        defaultValue={str_lokasi}
                    />

                    <input
                        type="text"
                        input-type="hidden"
                        name={"ARRAY_TANGGAL"}
                        defaultValue={tgl_terpesan}
                    />

                    <input
                        type="text"
                        input-type="hidden"
                        name={"ID_ALTERNATIF"}
                        defaultValue={id_alternatif}
                    />


                </form>
            </div>
            {
                Ready === true
                    ?
                    <>
                        <div className={SA['Container__mobil']} scroll-type="horizontal" >
                            {
                                Key.map((ke, i) => {
                                    return (
                                        <Fragment key={ke}>
                                            <Alternate_KD_Option Head={ke} KD={Value[i]} Img={mobil_img} />
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                    </>
                    :
                    <>
                        <div className={SA['Container__mobil__loading']}  >
                            <Shimerloading loop={0} />
                        </div>
                    </>
            }
        </>
    )
}
