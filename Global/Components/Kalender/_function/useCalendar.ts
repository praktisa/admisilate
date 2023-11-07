// 'use client'



import React, { useMemo, useState } from 'react'

export default function useCalendar(dateData: Date) {

  const [CurrentDate, setTanggal] = useState<Date>(dateData)
  const [ChosenDate, setChosenDate] = useState<string[]>([])




  const DateArrayContructor = (bulan: any, tahun: any) => {
    let ArrayTanggal = []
    let index = 1
    let TesTanggal = new Date(tahun, bulan, index).getDay()

    if (TesTanggal != 0) {
      index = index - TesTanggal
    }
    for (var i = 0; i < 42; i++) {
      let Now = new Date().setHours(0, 0, 0, 0)
      let DateData = new Date(tahun, bulan, index)
      let DateData_0 = DateData.setHours(0, 0, 0, 0)
      let StringDate = DateData.toString() // this


      let ObjectData = {
        id: StringDate,
        display: DateData.getDate(),
        styleMonth: new Date(DateData).getMonth() != CurrentDate.getMonth() ? "lower" : "higher",
        availablity: Now > DateData_0 ? "hidden" : "pickAble",
        isToday: Now === DateData_0 ? true : false
      }

      ArrayTanggal.push(ObjectData)
      index++
    }

    console.log("BUAT KALENDER", bulan, tahun)

    return ArrayTanggal
  }

  const CreateCalendar = useMemo(() => {

    let Calendar = DateArrayContructor(CurrentDate.getMonth(), CurrentDate.getFullYear())

    // con
    return Calendar

  }, [CurrentDate])


  function ChangeMonth(jml: any) {
    let NewDate = new Date(CurrentDate.setMonth(CurrentDate.getMonth() + jml))
    setTanggal(NewDate)
  }

  function HeadCalendar() {
    const NamaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]


    let Judulkalender = NamaBulan[CurrentDate.getMonth()] + " " + CurrentDate.getFullYear()

    return Judulkalender
  }


  function ChoseDate(e: Event, id: string) {
    const { target } = e

    setChosenDate((target as HTMLInputElement).checked === true
      ? [...ChosenDate, id]
      : ChosenDate.filter(e => e !== id))

  }



  return {
    // value
    CurrentDate,
    ChosenDate,
    HeadCalendar,
    CreateCalendar,

    // function 
    ChangeMonth,
    ChoseDate,
    setChosenDate,

  }
}
