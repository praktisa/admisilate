'use client'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import LP from './ListDataPicker2.module.css'
import { setCookie, getCookie } from 'cookies-next'


interface Kelompok__inter {
    [key: string]: Object[]
}

interface Object__inter {
    [key: string]: string
}


interface ListDataPicker2_inter {
    placeholder?: string,
    data?: any,
    group?: string,
    dataDisplay: string,
    idDisplay: string,
    filterOpt?: string[]
    CookieName: string
    CurrentData?: Object__inter
}

export default function ListDataPicker2(
    { placeholder = "Cari ...", data, group = '', dataDisplay, idDisplay, filterOpt = [], CookieName = "", CurrentData = undefined }: ListDataPicker2_inter
) {

    const DataPegawaiRef = useRef<HTMLDivElement | null>(null)
    const SearchEngineRef = useRef<HTMLInputElement | null>(null)
    const ShowDataRef = useRef<HTMLOListElement>(null)
    const ArrayPegawai = useRef<object>({})

    // console.log("pegawai", data)

    const [Filter, setFilter] = useState(group)

    function Filtering(filterString: string) {
        setFilter(filterString)


        let Inter = setInterval(() => {
            console.log("update")
            UpdateAfterFilter()

            clearInterval(Inter)
        }, data.length)


        // UpdateAfterFilter()
        // console.log("filter")
    }

    function UpdateAfterFilter() {
        let Cookie_string = getCookie(CookieName) as string


        // console.log("GetCookie", JSON.parse(Cookie_string))
        if (Cookie_string != "{}" && Cookie_string != undefined) {
            let Cookie_object = JSON.parse(Cookie_string)

            let Cookie_obj_keys = Object.keys(Cookie_object) as string[]
            let Cookie_obj_value = Object.values(Cookie_object) as string[]

            if (Cookie_obj_keys.length != 0) {
                for (var i = 0; i < Cookie_obj_keys.length; i++) {

                    // console.log("GetCookie", Cookie_obj_value[i], Cookie_obj_keys[i])
                    CheckUnCheck(Cookie_obj_value[i], Cookie_obj_keys[i], "onlyCheck")
                }
            }
        }
    }

    useEffect(() => {
        if (CurrentData != undefined) {
            if (Object.values(CurrentData).length !== 0) {

                let obj_keys = Object.keys(CurrentData) as string[]
                let obj_value = Object.values(CurrentData) as string[]

                for (var i = 0; i < obj_keys.length; i++) {
                    CheckUnCheck(obj_value[i], obj_keys[i], "onlyCheck")
                }
            }
        }
    }, [CurrentData])





    function SetCookies() {
        setCookie(CookieName, ArrayPegawai.current)
    }

    interface CatchData__inter {
        [key: string]: string
    }

    // function (masih bisa di optimize menggunakan useState agar tidak menggunakan useEffect)
    function CheckUnCheck(pegawai: string, NIP: string, option?: string) {

        let idCheck = document.querySelectorAll(`input[name="${pegawai}"]`) as NodeListOf<HTMLInputElement>

        let CatchData: CatchData__inter = {}

        function Checker(idCheck: any, NIP: string, pegawai: string, ischeck: boolean) {

            let Returned = {}

            for (var i = 0; i < idCheck.length; i++) {

                idCheck[i].checked = ischeck

                Returned = { display: pegawai, id: NIP, status: ischeck === true ? "add" : "remove" }

                if (ischeck === true) {
                    Object.assign(ArrayPegawai.current, { [NIP]: pegawai })
                } else {
                    delete ArrayPegawai.current[NIP as keyof typeof ArrayPegawai.current]
                }

            }

            return Returned
        }

        if (option === "onlyCheck") {
            // console.log("onlyCheck")
            CatchData = Checker(idCheck, NIP, pegawai, true)

        } else if (option === "reset") {

            CatchData = Checker(idCheck, NIP, pegawai, false)

            // console.log("Reset", CatchData)
        } else {
            // console.log("CHECK NORMAL")

            for (var i = 0; i < idCheck.length; i++) {

                if (idCheck[i].checked === false) {
                    idCheck[i].checked = true
                    CatchData = { display: pegawai, id: NIP, status: "add" }

                    Object.assign(ArrayPegawai.current, { [NIP]: pegawai })

                } else {
                    idCheck[i].checked = false

                    CatchData = { display: pegawai, id: NIP, status: "remove" }

                }
            }
        }

        function_CatchData(CatchData)
        SetCookies()

    }


    // Function
    function CheckAll({ CheckKelompok }: { CheckKelompok: any }) {

        function CheckAllKelompok(CheckKelompok: string) {
            let DOM_allKelompok = document.querySelectorAll(`input[data-kelompok="${CheckKelompok}"]`) as NodeListOf<HTMLInputElement>



            if (DOM_allKelompok[0].checked === false) {
                for (var i = 0; i < DOM_allKelompok.length; i++) {

                    let Name = DOM_allKelompok[i].name
                    let NIP = DOM_allKelompok[i].value

                    DOM_allKelompok[i].checked = true
                    if (i > 0 && NIP != "on") {
                        let CatchData: CatchData__inter = {}
                        Object.assign(ArrayPegawai.current, { [NIP]: Name })

                        CatchData = { display: Name, id: NIP, status: "add", delay: `${i}` }

                        // console.log("CheckALL add", CatchData)
                        function_CatchData(CatchData)

                    }
                }
            } else {
                for (var i = 0; i < DOM_allKelompok.length; i++) {
                    let NIP = DOM_allKelompok[i].value
                    let Name = DOM_allKelompok[i].name

                    DOM_allKelompok[i].checked = false

                    let CatchData: CatchData__inter = {}
                    CatchData = { display: Name, id: NIP, status: "remove", }
                    // console.log("CheckALL remove", CatchData)
                    function_CatchData(CatchData)

                    delete ArrayPegawai.current[NIP as keyof typeof ArrayPegawai.current]
                }
            }

            SetCookies()
        }

        return (
            <>
                <div className={LP['container__ListDataGroup']}
                    onClick={() => CheckAllKelompok(CheckKelompok)}
                >
                    <div className={LP['ListData__box']} >
                        <input
                            id-data="all"
                            className={LP['checkAll']}
                            type="checkbox"
                            defaultChecked={false}
                            data-kelompok={CheckKelompok}
                            name={"CheckAll"}
                            onClick={() => CheckAllKelompok(CheckKelompok)}
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

        let idCheck = document.querySelectorAll(`div[search-target="true ${dataDisplay}"]`) as NodeListOf<HTMLDivElement>

        let GroupContainer = document.getElementById(group)


        if (GroupContainer) {
            if (SearchEngineRef.current?.value.length === 0) {
                GroupContainer.style.display = "grid"

            } else {
                GroupContainer.style.display = "none"
            }
        }

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
                    idCheck[i].style.display = group.length === 0 ? "grid" : "none"
                }
            }

            clearTimeout(TimerSearch)
        }, 500)

    }

    // Components 
    function CMP_DataDisplay({ kelompok, display, id, searchTarget }: { kelompok?: string, display: string, id: string, searchTarget: string }) {

        let FreshID = id.replaceAll("'", "")

        return (
            <>
                <div
                    className={LP['container__ListData']}
                    search-target={searchTarget}
                    onClick={() => CheckUnCheck(display, FreshID)}
                >
                    <div className={LP['ListData__box']} >
                        <input
                            type="checkbox"
                            className={LP['check']}
                            data-kelompok={kelompok}
                            name={display}
                            value={FreshID}
                            defaultChecked={false}
                            onClick={() => CheckUnCheck(display, FreshID)}
                        />
                    </div>


                    <span
                        className={LP['ListData__label']}
                    >
                        {display}
                    </span>
                </div>
            </>
        )
    }


    function CMP_ListAllData() {

        return (
            <>
                <div id={"All " + group}>
                    {
                        data.map((insideData: any) => {

                            let GroupBy = insideData[Filter as keyof typeof insideData]
                            let DataDisplay = insideData[dataDisplay as keyof typeof insideData] as string
                            let IdDisplay = insideData[idDisplay as keyof typeof insideData] as string
                            let FreshNIP = IdDisplay.replaceAll("'", "")

                            if (!GroupBy) {
                                if (insideData['kode kantor posisi fungsional'] === "4502150000") {
                                    GroupBy = 'Fungsional Pemeriksa'
                                }
                            }

                            return (
                                <Fragment key={IdDisplay}>
                                    <CMP_DataDisplay
                                        id={FreshNIP}
                                        kelompok={GroupBy}
                                        searchTarget={"true " + dataDisplay}
                                        display={DataDisplay}
                                    />
                                </Fragment>
                            )
                        })
                    }
                </div>
            </>
        )
    }

    function CreateListGroupData(data: any) {
        let Kelompok: Kelompok__inter = {}

        for (var i = 0; i < data.length; i++) {

            let GroupBy = data[i][Filter]
            let AssignObjectValue = { [dataDisplay]: data[i][dataDisplay], [idDisplay]: data[i][idDisplay] }

            if (GroupBy) {
                let Unit: string = JSON.stringify(GroupBy)


                if (!Kelompok[JSON.parse(Unit)]) {
                    Object.assign(Kelompok, { [JSON.parse(Unit)]: [AssignObjectValue] })
                } else {
                    if (Kelompok[GroupBy!] && GroupBy != undefined) {
                        Kelompok[GroupBy].push(AssignObjectValue)
                    }
                }

            } else {

                if (data[i]['kode kantor posisi fungsional'] === "4502150000") {
                    if (!Kelompok['Fungsional Pemeriksa']) {
                        Object.assign(Kelompok, { 'Fungsional Pemeriksa': [AssignObjectValue] })
                    } else {
                        Kelompok['Fungsional Pemeriksa'].push(AssignObjectValue)
                    }
                }

            }
        }

        return Kelompok
    }

    // Components
    function CMP_ListGroupData() {


        let Kelompok: Kelompok__inter = CreateListGroupData(data)


        let Kelompok_Keys = Object.keys(Kelompok)


        return (
            <>
                <div id={group}>
                    {
                        Kelompok_Keys.map((KelKeys, i) => {

                            return (
                                <Fragment key={KelKeys}>
                                    <details className={LP['container__Details']} open={false}>
                                        <CheckAll CheckKelompok={KelKeys} />

                                        {
                                            Kelompok[KelKeys].map((namaPeg: object, o) => {
                                                let FreshNIP = namaPeg[idDisplay as keyof typeof namaPeg]
                                                let Disp = namaPeg[dataDisplay as keyof typeof namaPeg]

                                                return (
                                                    <Fragment key={FreshNIP}>
                                                        <CMP_DataDisplay
                                                            id={FreshNIP}
                                                            kelompok={KelKeys}
                                                            searchTarget="false"
                                                            display={Disp}
                                                        />
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
                </div>

            </>
        )
    }


    function function_CatchData(Catch: any) {

        const GetNode = document.querySelectorAll(`li[data-id="${Catch.id}"]`) as NodeListOf<HTMLOListElement>
        // console.log("Catch", Catch)


        if (Object.keys(Catch).length != 0) {
            if (Catch['status'] === "add" && GetNode.length === 0) {
                // console.log("catch with add")

                const node = document.createElement("li");
                const InputNode = document.createElement('input')
                InputNode.type = "text"
                InputNode.name = `pilihan_${dataDisplay}`
                // InputNode.readOnly = true
                InputNode.required = true
                InputNode.minLength = 1
                InputNode.defaultValue = `${Catch.id} - ${Catch.display}`
                InputNode.setAttribute("input-type", "hidden")
                InputNode.setAttribute("server-form", "primary")


                const textnode = document.createTextNode(Catch.display);


                node.appendChild(textnode)
                node.appendChild(InputNode)
                node.setAttribute("data-id", Catch.id)
                // node.setAttribute("data-order", `${ShowDataRef.current?.children.length}`)
                if (Catch.delay) {
                    node.style.animationDelay = `${Catch.delay}0ms`
                }



                node.onclick = function () { CheckUnCheck(Catch.display, Catch.id, "reset") }
                ShowDataRef.current?.appendChild(node)

                if (CurrentData === undefined) {
                    node.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                }



            } else if (Catch['status'] === "remove") {

                for (var i = 0; i < GetNode.length; i++) {

                    ShowDataRef.current?.removeChild(GetNode[i] as typeof ShowDataRef.current)
                }

            }

        } else {
            if (ShowDataRef.current) {
                ShowDataRef.current.innerHTML = ""
            }
        }


        let Jumlah = document.getElementById("jumlah " + dataDisplay)
        let reset__jumlah = document.getElementById("reset__jumlah " + dataDisplay)

        if (Jumlah && ShowDataRef.current && reset__jumlah) {
            Jumlah.innerText = `${ShowDataRef.current?.children.length}`

            if (ShowDataRef.current?.children.length > 0) {
                reset__jumlah.style.visibility = "visible"
            } else {
                reset__jumlah.style.visibility = "hidden"
            }
        }
    }

    function Reset() {

        let Keys = Object.keys(ArrayPegawai.current)
        let Values = Object.values(ArrayPegawai.current)
        let Jumlah = document.getElementById("jumlah " + dataDisplay)
        let reset__jumlah = document.getElementById("reset__jumlah " + dataDisplay)
        let CheckAlltoRemove = document.querySelectorAll(`input[id-data="all"]`) as NodeListOf<HTMLInputElement>
        let isCookieReady = getCookie(CookieName) as string

        for (var i = 0; i < Keys.length; i++) {
            CheckUnCheck(Values[i], Keys[i], "reset")
        }

        if (ShowDataRef.current && Jumlah && reset__jumlah && CheckAlltoRemove) {
            ShowDataRef.current.innerHTML = ""
            Jumlah.innerText = "0"
            reset__jumlah.style.visibility = "hidden"

            for (var i = 0; i < CheckAlltoRemove.length; i++) {
                if (CheckAlltoRemove[i].checked === true) {
                    CheckAlltoRemove[i].checked = false
                }
            }
        }
        if (isCookieReady) {
            setCookie(CookieName, {})
        }


    }

    function CMP_FilterSelection() {
        // console.log("Data", data)

        let CatchKeys = {}

        for (var i = 0; i < data.length; i++) {
            let Keys = Object.keys(data[i])
            for (var o = 0; o < Keys.length; o++) {
                Object.assign(CatchKeys, { [Keys[o]]: Keys[o] })

            }
        }

        let filterOption = Object.keys(CatchKeys)

        const intersection = filterOpt.filter(element => filterOption.includes(element))

        return (
            <>
                <ul className={LP['filter__selection']}>
                    {
                        intersection.map((fil, i) => {

                            return (
                                <Fragment key={fil}>
                                    <li onClick={() => Filtering(fil)}
                                        className={`${Filter === fil ? LP['current__Filter'] : LP['not__Filter']}`} >{fil.toUpperCase()}</li>
                                </Fragment>
                            )
                        })
                    }
                </ul>
            </>
        )
    }


    return (
        <>

            <div className={LP['separator']} >
                <div className={LP['container']} >
                    <div className={LP['container__search']} >
                        <input
                            className={LP['search__field']}
                            type="text"
                            placeholder={placeholder}
                            ref={SearchEngineRef}
                            onChange={() => SearchPegawai()}
                            name={"container__search"}
                            // required={true}
                            id={"SearchBox " + dataDisplay}
                            spellCheck={false}
                        />
                        {
                            group != "" && filterOpt.length != 0
                                ?
                                <div className={LP['filter__field']} >

                                    <label htmlFor={"filter__box " + dataDisplay} >Filter</label>
                                    <input className={LP['filter__box']} id={"filter__box " + dataDisplay} type='checkbox' />
                                    <CMP_FilterSelection />

                                </div>
                                :
                                <></>
                        }

                    </div>


                    <div ref={DataPegawaiRef} className={LP['container__pegawai']}>
                        {
                            group != ""
                                ?
                                <CMP_ListGroupData />
                                :
                                <></>
                        }

                        <CMP_ListAllData />
                    </div>


                </div>
                <div className={LP['container__selected']} >
                    <h2>
                        Total <span id={"jumlah " + dataDisplay}></span>
                        <span id={"reset__jumlah " + dataDisplay} className={LP['reset__jumlah']} onClick={() => Reset()} >
                            &#x2715;
                        </span>
                    </h2>
                    <ol id="showData" ref={ShowDataRef}></ol>
                </div>
            </div>

        </>
    )
}
// const SearchInputNode = document.getElementById("SearchBox")