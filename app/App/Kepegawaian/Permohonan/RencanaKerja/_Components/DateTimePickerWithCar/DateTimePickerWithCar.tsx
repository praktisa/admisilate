'use client'
import React, { Fragment, useState, useRef } from 'react'
import DTP from './DateTimePicker.module.css'

// import { setCookie } from 'cookies-next'
import TimePicker from '../TimePicker/TimePicker'
import Structure from '@/Global/Components/CTA/Structure'
import Label_KDPicker from '../KDPicker/KDPicker'

interface StatePicker__inter {
    [key: string]: { [key: string]: string }
}

interface DateTimePicker_inter {
    ImgMobil?: string
}

export default function DateTimePickerWithCar({ ImgMobil }: DateTimePicker_inter) {

    const [Open, setOpen] = useState(false)


    const [DateTime, setDateTime] = useState<StatePicker__inter>(
        {
            [Today()]: {
                "WAKTU": `${Today()} | 07:30 : 17:00`,
                "ID_MOBIL:": "",
                "STR_NAMA_MOBIL": "",
                "ANIMATED": "false"
            }
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
                [Today(day)]: {
                    "WAKTU": `${Today(day)} | 07:30 : 17:00`,
                    "ID_MOBIL:": "",
                    "STR_NAMA_MOBIL": "",
                    "ANIMATED": "true"
                }
            }
        } else {
            let Date_State = Object.keys(DateTime)
            let GetLastDate = new Date(Date_State[Date_State.length - 1])
            console.log("GetLastDate", GetLastDate)

            let NextDate = ParseDate(GetLastDate, 1)

            // console.log("NextDate", NextDate)

            Create = {
                [NextDate]: {
                    "WAKTU": `${NextDate} | 07:30 : 17:00`,
                    "ID_MOBIL:": "",
                    "STR_NAMA_MOBIL": "",
                    "ANIMATED": "true"
                }
            }
        }

        let GetDataFromDOM = UpdateData(false)

        // console.log("GetDataFromDOM", GetDataFromDOM)

        if (GetDataFromDOM) {
            let NewData = Object.assign(GetDataFromDOM, Create)
            // setCookie("tglRK", Object.keys(NewData))
            setDateTime(NewData)
            setPos(day)
        }

    }

    function DeleteDateTime(tgl: string) {

        let GetDataFromDOM: any = UpdateData(false)

        if (GetDataFromDOM) {
            delete GetDataFromDOM[tgl]

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

                console.log("5", (ContainerDateTimeRef[i].children[4] as HTMLInputElement))
                console.log("6", (ContainerDateTimeRef[i].children[5] as HTMLInputElement))

                let STR_NAMA_MOBIL_UPDATE = (ContainerDateTimeRef[i].children[4] as HTMLInputElement).value
                let ID_MOBIL_UPDATE = (ContainerDateTimeRef[i].children[5] as HTMLInputElement).value



                Object.assign(GetDomDateData, {
                    [Tanggal]:
                    {
                        "WAKTU": `${Tanggal} | ${DariJam}:${DariMenit} : ${SampaiJam}:${SampaiMenit}`,
                        "ID_MOBIL": ID_MOBIL_UPDATE,
                        "STR_NAMA_MOBIL": STR_NAMA_MOBIL_UPDATE,
                        "ANIMATED": "false"
                    }
                })
            }
        }

        let Sort_GetDomDateData = Object.keys(GetDomDateData).sort((a, b) => {
            let New_A = new Date(a)
            let New_B = new Date(b)


            return New_A.getTime() - New_B.getTime()
        })

        // console.log("Sort_GetDomDateData", Sort_GetDomDateData)

        let New_Sorted_Date_Data = {}

        // dsini bermasalah sur coba console.log ya`
        for (var i = 0; i < Sort_GetDomDateData.length; i++) {
            Object.assign(New_Sorted_Date_Data, {
                [Sort_GetDomDateData[i]]: GetDomDateData[`${Sort_GetDomDateData[i]}`]
            })
        }

        console.log("New_Sorted_Date_Data", New_Sorted_Date_Data)

        if (Render === true) {
            // setCookie("tglRK", Object.keys(New_Sorted_Date_Data))
            setDateTime(New_Sorted_Date_Data)
        } else {
            return New_Sorted_Date_Data
        }


    }


    function StringToTimePicker(string: string) {

        console.log("string", string)
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
                            // console.log("Dt.WAKTU", Dt.WAKTU)
                            let Waktu = StringToTimePicker(Dt.WAKTU)
                            let Conditional_Waktu = Waktu.Tanggal ? Waktu.Tanggal : Today() // untuk menjaga apabila waktu undefined

                            console.log("Dt Dt Dt", Dt)

                            return (
                                <Fragment key={Dt.WAKTU}>
                                    <div className={DTP['Date']} animate-type={Dt.ANIMATED} >

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

                                        <input type='text' input-type="hidden" name="STR_NAME_MOBIL" defaultValue={Dt.STR_NAMA_MOBIL} />
                                        <input type='text' input-type="hidden" name="ID_MOBIL" defaultValue={Dt.ID_MOBIL} />

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

                <Label_KDPicker
                    ImgMobil={ImgMobil}

                    Open={Open}
                    setOpen={setOpen}
                    DateTime={DateTime}
                    setDateTime={setDateTime}
                />

            </div>

        </>
    )
}
