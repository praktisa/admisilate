'use client'
import React, { Fragment, useState, useRef } from 'react'
import DTP from './DateTimePicker.module.css'

import { setCookie, getCookie } from 'cookies-next'
import TimePicker from '../TimePicker/TimePicker'
import Structure from '@/Global/Components/CTA/Structure'

interface StatePicker__inter {
    [key: string]: string
}

interface DateTimePicker_inter {
    CookieName?: string
}

export default function DateTimePicker({ CookieName }: DateTimePicker_inter) {

    const [DateTime, setDateTime] = useState<StatePicker__inter>(
        {
            [Today()]: `${Today()} | 07:30 : 17:00`
        }
    )

    const DateTimeRef = useRef<HTMLDivElement>(null)



    const [Pos, setPos] = useState<number>(Object.keys(DateTime).length - 1)

    function ParseDate(Date: Date, add: number) {

        Date.setDate(Date.getDate() + add)
        let StringDate = Date.toISOString().split('T')[0]

        return StringDate
    }

    function Today(add: number = 0) {

        let D = new Date()

        return ParseDate(D, add)

    }

    function CreateMoreDateTime(day: number, fromLastDate: boolean = false) {

        let Create: StatePicker__inter

        if (fromLastDate === false) {
            Create = {
                [Today(day)]: `${Today(day)} | 07:30 : 17:00`
            }
        } else {
            let Date_State = Object.keys(DateTime)
            let GetLastDate = new Date(Date_State[Date_State.length - 1])

            let NextDate = ParseDate(GetLastDate, 1)


            Create = {
                [NextDate]: `${NextDate} | 07:30 : 17:00`
            }
        }

        let GetDataFromDOM = UpdateData(false)

        if (GetDataFromDOM) {
            let NewData = Object.assign(GetDataFromDOM, Create)
            setCookie("tglRK", Object.keys(NewData))
            setDateTime(NewData)
            setPos(day)
        }

    }

    function DeleteDateTime(tgl: string) {

        let GetDataFromDOM: any = UpdateData(false)

        if (GetDataFromDOM) {
            delete GetDataFromDOM[tgl]
            setCookie("tglRK", Object.keys(GetDataFromDOM))
            setDateTime(GetDataFromDOM)

            if (Object.keys(GetDataFromDOM).length === 1) {
                setPos(0)
            } else {
                setPos(a => a - 1)
            }
        }

    }

    interface GetDomDateData {
        [key: string]: string
    }

    function UpdateData(Render: boolean) {

        let GetDomDateData: GetDomDateData = {}

        let ContainerDateTimeRef = DateTimeRef.current?.children

        // console.log("DateTimeRef", ContainerDateTimeRef)

        if (ContainerDateTimeRef) {
            for (var i = 0; i < ContainerDateTimeRef.length; i++) {
                let Tanggal = (ContainerDateTimeRef[i].children[2] as HTMLInputElement).value
                let Dari = ContainerDateTimeRef[i].children[3].children[0]
                let Sampai = ContainerDateTimeRef[i].children[3].children[2]

                let DariJam = (Dari.children[0] as HTMLInputElement).value
                let DariMenit = (Dari.children[2] as HTMLInputElement).value

                let SampaiJam = (Sampai.children[0] as HTMLInputElement).value
                let SampaiMenit = (Sampai.children[2] as HTMLInputElement).value

                Object.assign(GetDomDateData, { [Tanggal]: `${Tanggal} | ${DariJam}:${DariMenit} : ${SampaiJam}:${SampaiMenit}` })
            }
        }

        let Sort_GetDomDateData = Object.keys(GetDomDateData).sort((a, b) => {
            let New_A = new Date(a)
            let New_B = new Date(b)

            return New_A.getTime() - New_B.getTime()
        })

        // console.log("Sort_GetDomDateData", Sort_GetDomDateData)

        let New_Sorted_Date_Data = {}

        for (var i = 0; i < Sort_GetDomDateData.length; i++) {
            Object.assign(New_Sorted_Date_Data, {
                [Sort_GetDomDateData[i]]: GetDomDateData[`${Sort_GetDomDateData[i]}`]
            })
        }

        if (Render === true) {
            setCookie("tglRK", Object.keys(New_Sorted_Date_Data))
            setDateTime(New_Sorted_Date_Data)
        } else {
            return New_Sorted_Date_Data
        }



        // Render === true && setDateTime(GetDomDateData)
        // setDateTime(GetDomDateData)

    }


    function StringToTimePicker(string: string) {
        let SplitString = string.split("|")
        let Tanggal = SplitString[0].trim()
        let SplitJam = SplitString[1].split(":")

        let DariJam = SplitJam[0].trim()
        let DariMenit = SplitJam[1].trim()

        let SampaiJam = SplitJam[2].trim()
        let SampaiMenit = SplitJam[3].trim()

        // console.log("SplitString", string)

        return { Tanggal, DariJam, DariMenit, SampaiJam, SampaiMenit }
    }

    function ShowPicker(Tgl: string) {
        // DateLabelRef.current?.showPicker()
        let Picker = document.getElementById(Tgl) as HTMLInputElement

        Picker.showPicker()
    }

    function DateStringtoIndonesian(tgl: string) {
        let ArrayDate = tgl.split("-")

        let Bulan: any = {
            "01": "Januari",
            "02": "Februari",
            "03": "Maret",
            "04": "April",
            "05": "Mei",
            "06": "Juni",
            "07": "Juli",
            "08": "Agustus",
            "09": "September",
            "10": "Oktober",
            "11": "November",
            "12": "Desember"
        }

        // return `${ArrayDate[2]} ${Bulan[ArrayDate[1]]} ${ArrayDate[0]}`
        return `${ArrayDate[2]} ${Bulan[ArrayDate[1]]}`
    }


    return (
        <>

            <div className={DTP['Layout__Grid']}>

                <div className={DTP['Dates__Container__Grid']} ref={DateTimeRef} >

                    {
                        Object.values(DateTime).map((Dt, i) => {
                            let Waktu = StringToTimePicker(Dt)
                            let Conditional_Waktu = Waktu.Tanggal ? Waktu.Tanggal : Today() // untuk menjaga apabila waktu undefined

                            return (
                                <Fragment key={Dt}>
                                    <div className={DTP['Date']} >

                                        {
                                            Object.values(DateTime).length - 1 === i
                                                ?
                                                <div
                                                    className={`${DTP['Date__Action']} ${DTP['Date__Action__Add']}`}
                                                    onClick={() => { CreateMoreDateTime(Pos + 1, true); }}
                                                >
                                                    +
                                                </div>
                                                :
                                                <><div className={DTP['Date__Action']}> </div></>

                                        }


                                        <label
                                            htmlFor={Waktu.Tanggal}
                                            onClick={() => ShowPicker(Conditional_Waktu)}
                                        >
                                            <Structure style="outlined">
                                                {DateStringtoIndonesian(Conditional_Waktu)}
                                            </Structure>

                                        </label>
                                        <input
                                            required

                                            id={Conditional_Waktu}
                                            type='date'
                                            tabIndex={-1}
                                            // input-type="hidden"
                                            name="TanggalRK"
                                            className={DTP['Date__Input']}
                                            defaultValue={Conditional_Waktu}
                                            onChange={() => UpdateData(true)}
                                        />
                                        <TimePicker
                                            dj={Waktu.DariJam}
                                            dm={Waktu.DariMenit}
                                            sj={Waktu.SampaiJam}
                                            sm={Waktu.SampaiMenit}
                                            OnChange={UpdateData}
                                        />
                                        {
                                            Object.values(DateTime).length != 1
                                                ?
                                                <div
                                                    className={DTP['Date__Cancel']}
                                                    onClick={() => DeleteDateTime(Waktu.Tanggal)}
                                                >
                                                    &#x2715;
                                                </div>
                                                :
                                                <></>
                                        }

                                    </div>
                                </Fragment>
                            )
                        })
                    }

                </div>



            </div>

        </>
    )
}
