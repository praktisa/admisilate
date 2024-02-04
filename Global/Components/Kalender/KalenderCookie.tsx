'use client'
import React, { Fragment, useEffect, useState } from 'react'
import K from './Kalender.module.css'
import useCalendar from './_function/useCalendar'
import PenyingkatSeksi from '@/Global/function/PenyingkatSeksi'
import Shimerloading from '../Loading/Shimerloading'
import { AnySrvRecord } from 'dns'
// import { setCookie } from 'cookies-next'

interface TanggalTerpinjam {
    Peminjam: string
    TanggalPinjam: string
}

interface Peminjam {
    display: any,
    hover: any,
}

interface Kalender__inter {
    terpinjam: string,
    editValue?: any
}

export default function Kalender({ terpinjam = "", editValue = [] }: Kalender__inter) {

    const { CurrentDate, ChosenDate, HeadCalendar, CreateCalendar, ChangeMonth, ChoseDate, setChosenDate } = useCalendar(new Date())

    const [DataTerpinjam, setDataterpinjam] = useState<TanggalTerpinjam[]>([])


    useEffect(() => {
        let ArrObj: any = []

        if (terpinjam != "") {
            let terpinjamParsed = JSON.parse(terpinjam)
            // console.log("editValue", editValue)
            // console.log("terpinjam", terpinjam)

            let KeyTerpinjam = Object.keys(terpinjamParsed)
            let ValueTerpinjam = Object.values(terpinjamParsed)

            for (var i = 0; i < KeyTerpinjam.length; i++) {

                let TargetEditDate = editValue.includes(KeyTerpinjam[i])

                if (!TargetEditDate) {
                    let DataKonversi: TanggalTerpinjam = {
                        "Peminjam": ValueTerpinjam[i] as string,
                        "TanggalPinjam": KeyTerpinjam[i]
                    }
                    ArrObj.push(DataKonversi)
                }

            }

            if (editValue.length > 0) {
                setChosenDate(editValue)
            }

            setDataterpinjam(ArrObj)

        }
        console.log("terpinjam", terpinjam)

    }, [terpinjam])

    function Peminjam({ display, hover }: Peminjam) {
        return (
            <div
                className={K['peminjam']}
            >
                <span>{display}</span>
                <span>{hover}</span>
            </div>
        )
    }

    console.log("ChosenDate", ChosenDate)
    return (
        <>
            <input input-type="hidden" type="text" name="Chosen__TGL" defaultValue={ChosenDate} />
            <div className={K['layout']} >

                <div className={K['layout__header']}>

                    <h2>{HeadCalendar()}</h2>
                    <div onClick={() => ChangeMonth(1)} className={K['arrow']} >&#8593;</div>
                    <div onClick={() => ChangeMonth(-1)} className={K['arrow']} >&#8595;</div>
                    {/* <div className={K['arrow']} onClick={onClose} >&#x2715;</div> */}

                </div>

                <div className={K['layout__tanggal']}>
                    <div>Min</div>
                    <div>Sen</div>
                    <div>Sel</div>
                    <div>Rab</div>
                    <div>Kam</div>
                    <div>Jum</div>
                    <div>Sab</div>

                    {/* optimasi list tanggal diawah ini sur */}
                    {
                        CreateCalendar.map((tangs, i) => {

                            let obj = DataTerpinjam.find(o => o.TanggalPinjam === tangs.id);

                            let Terpinjam = false // pick = readyPick
                            let SingkatPeminjam = ""
                            if (obj != undefined) {
                                let today = new Date().setHours(0, 0, 0, 0)
                                let Compare = new Date(obj.TanggalPinjam).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)

                                // console.log("obj.TanggalPinjam", obj)
                                // console.log("Compare", today, Compare)

                                Terpinjam = Compare === true ? false : true
                                // Apabila Tanggal Booking lebih kecil dari tanggal sekarang maka Terpinjam tidak dimunculkan
                            }

                            if (obj != undefined) {
                                SingkatPeminjam = PenyingkatSeksi(obj.Peminjam)
                            }



                            let fix_styleMonth = tangs.styleMonth
                            let fix_pick = ChosenDate.includes(tangs.id)
                                ? "pick"
                                : Terpinjam ? "picked" : "readyPick"


                            let fix_availablity =
                                fix_pick === "picked"
                                    ? "disable"
                                    : tangs.availablity

                            let HariIni = tangs.isToday === true ? "HariIni" : "null"

                            return (
                                <Fragment key={tangs.id}>

                                    {
                                        Terpinjam === true
                                            ?
                                            <Peminjam
                                                display={SingkatPeminjam}
                                                hover={tangs.display}
                                            />
                                            :
                                            <>

                                                <input
                                                    id={`${i}`}
                                                    type='checkbox'
                                                    defaultValue={tangs.id}
                                                    name='TGL'
                                                    className={K['none']}
                                                    checked={fix_pick === "pick" ? true : false}
                                                    onChange={(e: any) => { ChoseDate(e, tangs.id); }}
                                                    disabled={fix_availablity === "disable" ? true : false}
                                                />

                                                <label
                                                    htmlFor={`${i}`}
                                                    className={`
                                                    ${K['basicStructure']} 
                                                    ${K[fix_styleMonth]} 
                                                    ${K[fix_availablity]} 
                                                    ${K[fix_pick]}
                                                    ${K[HariIni]}
                                                    `}

                                                >

                                                    {tangs.display}
                                                </label>
                                            </>
                                    }

                                </Fragment>
                            )
                        })
                    }


                </div>

            </div>


        </>
    )
}
