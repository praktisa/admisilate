
import React, { Fragment } from 'react'
import StyledTable from '@/Global/Components/Table/StyledTable'
import PenyingkatSeksi from '@/Global/function/PenyingkatSeksi'
import CCP from './C_CoverPinjam.module.css'
import Structure from '@/Global/Components/CTA/Structure'
import { Action_Ambil_Alih } from '../../monitoring/Action/AmbilAlihAction'

export function S_TableData({ DATA }: { DATA: any }) {


    let Today = new Date()
    let TGL_TODAY = `${Today.getDate()}-${Today.getMonth() + 1}-${Today.getFullYear()}`


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

                                                                <Form_Ambil_Alih
                                                                    ID_REGISTER={datas.ID}
                                                                    ID_STATUS={datas.ID_STATUS}
                                                                    TGL={TGL_STR_DIBALIK}
                                                                />


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
                        <div >Kembali</div>
                        {/* <div onClick={() => setDataDisplay(DATA)} >Refresh</div> */}
                    </div>
                </div>


            </div>

        </>
    )
}

interface CMP_AmbilAlih_inter {
    ID_REGISTER: string, ID_STATUS: string, TGL: string
}

export async function Form_Ambil_Alih({ ID_REGISTER, ID_STATUS, TGL }: CMP_AmbilAlih_inter) {


    return (
        <>
            <form action={Action_Ambil_Alih} >

                <label htmlFor="Ambil_Alih">
                    <Structure style={"danger"}>
                        Mandatory
                    </Structure>
                </label>


                <input input-type="hidden" type="text" name="ID_REGISTER" defaultValue={ID_REGISTER} />
                <input input-type="hidden" type="text" name="ID_STATUS" defaultValue={ID_STATUS} />
                <input input-type="hidden" type="text" name="TGL" defaultValue={TGL} />
                <input input-type="hidden" type='submit' id="Ambil_Alih" />

            </form>



        </>
    )
}