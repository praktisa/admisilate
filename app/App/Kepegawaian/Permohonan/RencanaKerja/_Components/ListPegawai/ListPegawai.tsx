'use client'
import React, { Fragment, useRef, useState, useEffect } from 'react'
import Pegawai from 'database/_private/Pegawai.json'
import LP from './ListPegawai.module.css'
import { setCookie, getCookie } from 'cookies-next'
import PegawaiDisplayer from './PegawaiDisplayer'

interface Kelompok_inter {
    [key: string]: {
        Nama: string,
        NIP: string
    }[]
}

export default function ListPegawai() {

    // console.log("Pegawai", Pegawai)

    const DataPegawaiRef = useRef<HTMLDivElement | null>(null)
    const SearchEngineRef = useRef<HTMLInputElement | null>(null)
    const ShowDataRef = useRef<HTMLOListElement>(null)

    const ArrayPegawai = useRef<object>({})

    interface CatchData__inter {
        [key: string]: string
    }
    // function (masih bisa di optimize menggunakan useState agar tidak menggunakan useEffect)
    function CheckUnCheck(pegawai: string, NIP: string) {

        let idCheck = document.querySelectorAll(`input[name="${pegawai}"]`) as NodeListOf<HTMLInputElement>


        let CatchData: CatchData__inter = {}


        for (var i = 0; i < idCheck.length; i++) {

            if (idCheck[i].checked === false) {

                idCheck[i].checked = true
                CatchData = { data: pegawai, status: "add" }
                Object.assign(ArrayPegawai.current, { [NIP]: pegawai })
            } else {
                idCheck[i].checked = false

                CatchData = { data: pegawai, status: "remove" }
                delete ArrayPegawai.current[NIP as keyof typeof ArrayPegawai.current]
            }
        }



        if (CatchData['status'] === "add") {
            const node = document.createElement("li");
            const textnode = document.createTextNode(CatchData['data']);
            node.appendChild(textnode)
            node.setAttribute("id", NIP)
            node.onclick = function () { CheckUnCheck(pegawai, NIP) }
            ShowDataRef.current?.appendChild(node)

        } else if (CatchData['status'] === "remove") {
            const GetNode = document.getElementById(NIP)
            ShowDataRef.current?.removeChild(GetNode as typeof ShowDataRef.current)
        }

        setCookie("ListPegawaiRK", ArrayPegawai.current)



        console.log("CECKKK", ArrayPegawai.current)


        return ArrayPegawai.current
    }


    // Function
    function CheckAll({ CheckKelompok }: { CheckKelompok: any }) {

        // console.log("CECKKK ALLLL")
        function CheckAllKelompok(CheckKelompok: string) {
            let DOM_allKelompok = document.querySelectorAll(`input[data-kelompok="${CheckKelompok}"]`) as NodeListOf<HTMLInputElement>

            if (DOM_allKelompok[0].checked === false) {
                for (var i = 0; i < DOM_allKelompok.length; i++) {
                    let Name = DOM_allKelompok[i].name
                    let NIP = DOM_allKelompok[i].value

                    DOM_allKelompok[i].checked = true
                    if (i > 0 && NIP != "on") {
                        Object.assign(ArrayPegawai.current, { [NIP]: Name })
                    }
                }
            } else {
                for (var i = 0; i < DOM_allKelompok.length; i++) {
                    let NIP = DOM_allKelompok[i].value
                    // console.log("HAPUS")


                    DOM_allKelompok[i].checked = false
                    delete ArrayPegawai.current[NIP as keyof typeof ArrayPegawai.current]
                }
            }

            DisplayData()



            setCookie("ListPegawaiRK", ArrayPegawai.current)


        }

        return (
            <>
                <div className={LP['container__ListDataSeksi']} onClick={() => CheckAllKelompok(CheckKelompok)}>
                    <div className={LP['ListData__box']} >
                        <input
                            className={LP['checkAll']}
                            type="checkbox"
                            defaultChecked={false}
                            data-kelompok={CheckKelompok}
                            name={"CheckAll"}
                        />
                    </div>

                    <span
                        className={LP['ListData__label']}
                    >
                        ( PILIH SEMUA )
                    </span>
                </div>
            </>
        )
    }

    // Function
    function SearchPegawai() {

        let idCheck = document.querySelectorAll(`div[search-target="true"]`) as NodeListOf<HTMLDivElement>

        let TimerSearch = setTimeout(() => {
            for (var i = 0; i < idCheck.length; i++) {
                let LowerName = idCheck[i].innerText.toLowerCase()
                let SearchName = SearchEngineRef.current?.value.toLowerCase() as string

                if (SearchName.length != 0) {
                    if (!LowerName.includes(SearchName)) {
                        idCheck[i].style.display = "none"
                    } else {
                        idCheck[i].style.display = "grid"
                    }
                } else {
                    idCheck[i].style.display = "none"
                }
            }

            clearTimeout(TimerSearch)
        }, 500)


    }

    // Components 
    function DataPegawai({ kelompok, pegawai, NIP }: { kelompok?: string, pegawai: string, NIP: string }) {

        let FreshNIP = NIP.replaceAll("'", "")

        return (
            <>
                <div className={LP['ListData__box']} >
                    <input
                        type="checkbox"
                        className={LP['check']}
                        data-kelompok={kelompok}
                        name={pegawai}
                        value={FreshNIP}
                        defaultChecked={false}
                        onClick={() => CheckUnCheck(pegawai, FreshNIP)}
                    />
                </div>


                <span
                    className={LP['ListData__label']}
                >
                    {pegawai}
                </span>
            </>
        )
    }

    // Components (masih bisa diimprove dijadikan 1 dengan dataPegawai)
    function ListDataPegawai() {
        return (
            <>
                {
                    Pegawai.map((peg, i) => {

                        let Unit = peg['UNIT ORGANISASI']

                        if (!Unit) {
                            if (peg['kode kantor posisi fungsional'] === "4502150000") {
                                Unit = 'Fungsional Pemeriksa'
                            }
                        }
                        let FreshNIP = peg['IP Sikka'].replaceAll("'", "")

                        return (
                            <Fragment key={peg['IP Sikka']}>
                                <div
                                    className={LP['container__ListData']}
                                    onClick={() => CheckUnCheck(peg['NAMA PEGAWAI'], FreshNIP)}
                                    search-target={"true"}
                                >
                                    <DataPegawai kelompok={Unit} pegawai={peg['NAMA PEGAWAI']} NIP={FreshNIP} />
                                </div>
                            </Fragment>
                        )
                    })
                }
            </>
        )
    }
    // Components
    function ListSeksiDataPegawai() {

        let Kelompok: Kelompok_inter = {}

        for (var i = 0; i < Pegawai.length; i++) {

            if (Pegawai[i]['UNIT ORGANISASI']) {
                let Unit: string = JSON.stringify(Pegawai[i]['UNIT ORGANISASI'])

                if (!Kelompok[JSON.parse(Unit)]) {
                    Object.assign(Kelompok, { [JSON.parse(Unit)]: [{ Nama: Pegawai[i]['NAMA PEGAWAI'], NIP: Pegawai[i]['IP Sikka'] }] })
                } else {
                    if (Kelompok[Pegawai[i]['UNIT ORGANISASI']!] && Pegawai[i]['UNIT ORGANISASI'] != undefined) {
                        //@ts-ignore 
                        Kelompok[Pegawai[i]['UNIT ORGANISASI']].push({ Nama: Pegawai[i]['NAMA PEGAWAI'], NIP: Pegawai[i]['IP Sikka'] })
                    }
                }

            } else {

                if (Pegawai[i]['kode kantor posisi fungsional'] === "4502150000") {
                    if (!Kelompok['Fungsional Pemeriksa']) {
                        Object.assign(Kelompok, { 'Fungsional Pemeriksa': [{ Nama: Pegawai[i]['NAMA PEGAWAI'], NIP: Pegawai[i]['IP Sikka'] }] })
                    } else {
                        Kelompok['Fungsional Pemeriksa'].push({ Nama: Pegawai[i]['NAMA PEGAWAI'], NIP: Pegawai[i]['IP Sikka'] })
                    }

                }

            }
        }

        let Kelompok_Keys = Object.keys(Kelompok)

        return (
            <>
                {
                    Kelompok_Keys.map((KelKeys, i) => {

                        return (
                            <Fragment key={KelKeys}>
                                <details className={LP['container__Details']} >
                                    <CheckAll CheckKelompok={KelKeys} />
                                    {
                                        Kelompok[KelKeys].map((namaPeg, o) => {
                                            let FreshNIP = namaPeg.NIP.replaceAll("'", "")

                                            return (
                                                <Fragment key={namaPeg.Nama}>
                                                    <div onClick={() => CheckUnCheck(namaPeg.Nama, FreshNIP)} className={LP['container__ListDataSeksi']}>
                                                        <DataPegawai kelompok={KelKeys} pegawai={namaPeg.Nama} NIP={FreshNIP} />
                                                    </div>
                                                </Fragment>
                                            )
                                        })
                                    }

                                    <summary className={LP['container__summary']}>
                                        {KelKeys.toUpperCase()} <span></span>
                                    </summary>


                                </details>
                            </Fragment>
                        )
                    })
                }
            </>
        )
    }


    function DisplayData() {

        let Keys = Object.keys(ArrayPegawai.current)
        let Values = Object.values(ArrayPegawai.current)

        let Current = document.getElementById("showData") as HTMLOListElement

        if (Current) {
            Current.innerHTML = ""
        }

        console.log("DATA lebih", ArrayPegawai.current)
        for (var i = 0; i < Values.length; i++) {
            let node = document.createElement("li");
            let textnode = document.createTextNode(Values[i]);
            node.appendChild(textnode)
            node.setAttribute("id", Keys[i])
            node.onclick = function () { CheckUnCheck(node.textContent as string, node.id) }
            ShowDataRef.current?.appendChild(node)
        }

    }

    return (
        <>

            <div className={LP['separator']} >


                <div className={LP['container']} >
                    <input
                        className={LP['container__search']}
                        type="text"
                        placeholder='Cari Pegawai ...'
                        ref={SearchEngineRef}
                        onChange={() => SearchPegawai()}
                        name={"container__search"}
                    />

                    <div ref={DataPegawaiRef} className={LP['container__pegawai']}>
                        <ListSeksiDataPegawai />
                        <ListDataPegawai />
                    </div>


                </div>
                <div className={LP['container__selected']} >



                    <ol id="showData" ref={ShowDataRef}>

                    </ol>

                </div>
            </div>

        </>
    )
}
