'use client'
import React, { Fragment, useContext, useState } from 'react'
import StyledTable from '@/Global/Components/Table/StyledTable'
import CCP from './C_CoverPinjam.module.css'
import PenyingkatSeksi from '@/Global/function/PenyingkatSeksi'
import PortalKonfirmation from '@/Global/Components/Portal/PortalKonfirmation/PortalKonfirmation'
import { ModalContext } from '@/Global/Components/Portal/PortalKonfirmation/PortalKonfirmation'
import Structure from '@/Global/Components/CTA/Structure'

export default function C_CoverPinjam({ DATA, HARI_INI }: { DATA: object[], HARI_INI: object[] }) {


    function Cover() {
        return (
            <>
                <StyledTable>
                    <table>
                        <thead>
                            <tr style={{ width: "100%" }}>
                                <th style={{ width: "45%" }}>{HARI_INI.length} Mobil</th>
                                <th style={{ width: "20%" }}>Peminjam</th>
                                <th style={{ width: "35%" }}>Tujuan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                HARI_INI.map((datas: any, i: number) => {

                                    // let TGL = datas['STR_DATE']

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
            <PortalKonfirmation
                onOpen={<Cover />}
            >
                <TableData DATA={DATA} />
            </PortalKonfirmation>
        </>
    )
}

export function TableData({ DATA }: { DATA: any }) {

    const BatalToggle = useContext(ModalContext)

    const [DataDisplay, setDataDisplay] = useState(DATA)

    let Today = new Date()
    let TGL_TODAY = `${Today.getDate()}-${Today.getMonth() + 1}-${Today.getFullYear()}`

    console.log("TableData", DATA)


    function CreateFilter(DATA: any, QUERY: string) {

        let ArrayOfFilter = []
        for (var i = 0; i < DATA.length; i++) {
            console.log("DATA", DATA[i]['STR_NAMA_KENDARAAN'])
        }
    }

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

    CreateFilter(DATA, "")

    return (
        <>
            <div className={CCP['TableData__Position']}  >
                <div className={CCP['TableData__Grid']}>

                    <div className={CCP['TableData__Container']} >

                        <StyledTable>
                            <table>
                                <thead style={{ width: "100%" }}>
                                    <tr>
                                        <th style={{ width: "15%" }} >Tanggal <Filter name={"Tanggal"} /></th>
                                        <th style={{ width: "25%" }}>Mobil <Filter name={"Mobil"} /></th>
                                        <th style={{ width: "15%" }}>Peminjam</th>
                                        <th style={{ width: "20%" }}>Tujuan</th>
                                        <th style={{ width: "25%" }}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        DATA.map((datas: any, i: number) => {

                                            let MOBIL = datas['STR_NAMA_KENDARAAN']
                                            let PEMINJAM = datas['STR_PEMINJAM']
                                            let TUJUAN = datas['STR_TUJUAN']

                                            let TGL = datas['STR_DATE']
                                            let TGL_STR = `${TGL.getDate()}-${TGL.getMonth() + 1}-${TGL.getFullYear()}`
                                            TGL_STR === TGL_TODAY ? TGL_STR = "Hari Ini" : TGL_STR

                                            // STEP ambil alih
                                            // tb_status copy permohonan yang pesan dan ubah jadi atas nama SUKI

                                            // tb_register yang dicopy ubah ID_STATUSnya menjadi ID STATUS dari tb_status pesanan SUKI

                                            // tb_mandatory copy data yang diambil alih oleh suki ke tabel ini <<< berfungsi untuk mengembalikan apabila tidak jadi

                                            return (
                                                <Fragment key={i + MOBIL + PEMINJAM}>
                                                    <tr>

                                                        <td  >{TGL_STR}</td>
                                                        <td>{MOBIL}</td>
                                                        <td>{PenyingkatSeksi(PEMINJAM)}</td>
                                                        <td>{TUJUAN}</td>
                                                        <td>
                                                            <div style={{ display: "flex", gap: "10px" }}>
                                                                <Structure style={"outlined"}>
                                                                    Lihat
                                                                </Structure>

                                                                {
                                                                    PenyingkatSeksi(PEMINJAM) != "SUKI"
                                                                        ? <Structure style={"danger"}>
                                                                            Ambil Alih
                                                                        </Structure>
                                                                        : <></>

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
                        <div>Hari Ini</div>
                        <div>Bulan 11</div>
                        <div>Bulan 12</div>
                        <div onClick={() => BatalToggle.Show(false)}>Semua</div>
                    </div>
                </div>


            </div>

        </>
    )
}