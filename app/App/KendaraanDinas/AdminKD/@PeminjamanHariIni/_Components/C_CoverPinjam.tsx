'use client'
import React, { Fragment, useState, useEffect } from 'react'
import StyledTable from '@/Global/Components/Table/StyledTable'

import CCP from './C_CoverPinjam.module.css'
import PenyingkatSeksi from '@/Global/function/PenyingkatSeksi'
// import PortalKonfirmation from '@/Global/Components/Portal/PortalKonfirmation/PortalKonfirmation'
import { ModalContext } from '@/Global/Components/Portal/PortalKonfirmation/PortalKonfirmation'
import C_Structure from '@/Global/Components/CTA/C_Structure'
import FETCH_POST_AMBIL_ALIH_RIWAYAT from '../../../Riwayat/Action/api/AmbilAlihRiwayat/fetch'
import FETCH_POST_KEMBALIKAN_RIWAYAT from '../../../Riwayat/Action/api/KembalikanRiwayat/fetch'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'




export default function C_CoverPinjam({ HARI_INI }: { HARI_INI: object[] }) {


    function Cover() {
        return (
            <>
                <StyledTable>
                    <table>
                        <thead>
                            <tr style={{ width: "100%" }}>
                                <th style={{ width: "40%" }}>{HARI_INI.length} Mobil</th>
                                <th style={{ width: "20%" }}>Peminjam</th>
                                <th style={{ width: "35%" }}>Tujuan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                HARI_INI.map((datas: any, i: number) => {

                                    let MOBIL = datas['STR_NAMA_KENDARAAN']
                                    let PEMINJAM = PenyingkatSeksi(datas['STR_PEMINJAM'])
                                    let TUJUAN = datas['STR_TUJUAN']
                                    return (
                                        <Fragment key={MOBIL + PEMINJAM}>
                                            <tr>
                                                <td>{MOBIL}</td>
                                                <td>{PEMINJAM}</td>
                                                <td>{TUJUAN}</td>
                                            </tr>
                                        </Fragment>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </StyledTable>
            </>
        )
    }

    return (
        <>

            <Link href={'/App/KendaraanDinas/AdminKD/monitoring'}>
                <Cover />
            </Link>

        </>
    )
}

export function TableData({ DATA }: { DATA: any }) {

    const Router = useRouter()
    let Today = new Date()
    let TGL_TODAY = `${Today.getDate()}-${Today.getMonth() + 1}-${Today.getFullYear()}`

    const [triger, setTriger] = useState(false)

    useEffect(() => {
        Router.refresh()

        console.log("REFRESH TRIGERED", DATA[0])
    }, [triger])

    // console.log("DATA", DATA)

    // function CreateFilter(DATA: any, QUERY: string) {

    //     let ArrayOfFilter = []
    //     for (var i = 0; i < DATA.length; i++) {
    //         console.log("DATA", DATA[i]['STR_NAMA_KENDARAAN'])
    //     }
    // }

    function Filter({ name }: { name: string }) {
        return (
            <>
                {/* <div className={CCP['Filter__Container']}> */}
                <input className={CCP['FilterCheck']} input-type="hidden" type="checkbox" name="FilterData" id={name} />
                <label className={CCP['FilterLabel']} htmlFor={name}>V</label>

                <ul className={CCP['Filter__List']} >
                    <li>Mitsubishi Expander 06</li>
                    <li>Daihatsu Terios</li>
                </ul>
                {/* </div> */}
            </>
        )
    }

    // CreateFilter(DATA, "")

    return (
        <>
            <div className={CCP['TableData__Position']}  >
                <div className={CCP['TableData__Grid']}>

                    <div className={CCP['TableData__Container']} >

                        <StyledTable>
                            <table>
                                <thead style={{ width: "100%" }}>
                                    <tr >
                                        <th style={{ width: "15%" }} >Tanggal <Filter name={"Tanggal"} /></th>
                                        <th style={{ width: "25%" }}>Mobil <Filter name={"Mobil"} /></th>
                                        <th style={{ width: "15%" }}>Peminjam</th>
                                        <th style={{ width: "20%" }}>Tujuan</th>
                                        <th style={{ width: "25%" }} >Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        DATA.map((datas: any, i: number) => {

                                            let MOBIL = datas['STR_NAMA_KENDARAAN']
                                            let PEMINJAM = datas['STR_PEMINJAM']
                                            let TUJUAN = datas['STR_TUJUAN']

                                            let TGL = new Date(datas['STR_DATE'])
                                            let TGL_STR = `${TGL.getDate()}-${TGL.getMonth() + 1}-${TGL.getFullYear()}`
                                            let TGL_STR_DIBALIK = `${TGL.getFullYear()}-${TGL.getMonth() + 1}-${TGL.getDate()}`

                                            TGL_STR === TGL_TODAY ? TGL_STR = "Hari Ini" : TGL_STR


                                            return (
                                                <Fragment key={i + MOBIL + PEMINJAM}>
                                                    <tr>

                                                        <td>{TGL_STR}</td>
                                                        <td>{MOBIL}</td>
                                                        <td>{PenyingkatSeksi(PEMINJAM)}</td>
                                                        <td>{TUJUAN}</td>
                                                        <td>
                                                            <div style={{ display: "flex", gap: "10px" }}>
                                                                {/* <C_Structure style={"outlined"}>
                                                                    Lihat
                                                                </C_Structure> */}

                                                                {
                                                                    // PenyingkatSeksi(PEMINJAM) != "SUKI"
                                                                    TUJUAN != "Digunakan Umum (Mandatory)"
                                                                        ?
                                                                        PenyingkatSeksi(PEMINJAM) != "SUKI"
                                                                            ?
                                                                            <CMP_AmbilAlih ID_REGISTER={datas.ID} ID_STATUS={datas.ID_STATUS} TGL={TGL_STR_DIBALIK} setTriger={setTriger} />
                                                                            : <></>
                                                                        :
                                                                        <CMP_Kembalikan
                                                                            ID_REGISTER={datas.ID}
                                                                            STR_APPROVE={datas.STR_APPROVE}
                                                                            TGL={TGL_STR_DIBALIK}
                                                                            ID_STATUS={datas.ID_STATUS}
                                                                            setTriger={setTriger}
                                                                        />
                                                                }

                                                            </div>

                                                        </td>
                                                    </tr>
                                                </Fragment>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </StyledTable>
                    </div>

                    <div className={CCP['TableData__Filter']}>
                        <div onClick={() => Router.back()}>Kembali</div>
                        {/* <div onClick={() => setDataDisplay(DATA)} >Refresh</div> */}
                    </div>
                </div>


            </div>

        </>
    )
}


interface CMP_AmbilAlih_inter {
    ID_REGISTER: string, ID_STATUS: string, TGL: string, setTriger: any
}

function CMP_AmbilAlih({ ID_REGISTER, ID_STATUS, TGL, setTriger }: CMP_AmbilAlih_inter) {

    const [LoadAmbilAlih, setLoadAmbilAlih] = useState(false)

    async function Ambil_Alih_Register(ID_REGISTER: string, ID_STATUS: string, TGL: string) {
        setLoadAmbilAlih(true)

        let Res = await FETCH_POST_AMBIL_ALIH_RIWAYAT(ID_REGISTER, ID_STATUS, TGL).then((res) => {
            setLoadAmbilAlih(false)
            setTriger(true)
            setTriger(false)
        })
    }


    return (
        <C_Structure style={"danger"} onClick={() => Ambil_Alih_Register(ID_REGISTER, ID_STATUS, TGL)}>
            {LoadAmbilAlih === true ? <Shimerloading loop={0} /> : <></>}
            Ambil Alih
        </C_Structure>
    )
}








interface CMP_Kembalikan_inter {
    ID_REGISTER: string, STR_APPROVE: string, TGL: string, ID_STATUS: string, setTriger: any
}


function CMP_Kembalikan({ ID_REGISTER, STR_APPROVE, TGL, ID_STATUS, setTriger }: CMP_Kembalikan_inter) {

    const [LoadAmbilAlih, setLoadAmbilAlih] = useState(false)



    async function Kembalikan_Register(ID_REGISTER: string, STR_APPROVE: string, TGL: string, ID_STATUS: string) {
        setLoadAmbilAlih(true)

        let Res = await FETCH_POST_KEMBALIKAN_RIWAYAT(ID_REGISTER, STR_APPROVE, TGL, ID_STATUS).then((res) => {
            setLoadAmbilAlih(false)
            setTriger(true)
            setTriger(false)
            // return res
        })

        // console.log("Kembalikan_Register", Res)
    }


    return (
        <C_Structure style={"success"} onClick={() => Kembalikan_Register(ID_REGISTER, STR_APPROVE, TGL, ID_STATUS)}>
            {LoadAmbilAlih === true ? <Shimerloading loop={0} /> : <></>}
            Kembalikan
        </C_Structure>

    )
}