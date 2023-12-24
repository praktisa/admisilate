
import React from 'react'
import StyledTable from '@/Global/Components/Table/StyledTable'
import { Action_Ambil_Alih, Action_Kembalikan } from '../../monitoring/Action/AmbilAlihAction'
import CCP from './C_CoverPinjam.module.css'


import C_ListData from './C_ListData'
import Link from 'next/link'
import Structure from '@/Global/Components/CTA/Structure'

export function S_TableData({ DATA }: { DATA: any }) {


    return (
        <>
            <div className={CCP['TableData__Position']}  >
                <div className={CCP['TableData__Grid']}>
                    <h3 >Register Peminjaman</h3>
                    <div className={CCP['TableData__Container']} >

                        <StyledTable>
                            <table>

                                <thead style={{ width: "100%" }}>
                                    <tr >
                                        <th style={{ width: "15%" }} >Tanggal</th>
                                        <th style={{ width: "25%" }}>Mobil</th>
                                        <th style={{ width: "15%" }}>Peminjam</th>
                                        <th style={{ width: "20%" }}>Tujuan</th>
                                        <th style={{ width: "25%" }} >Ambil Alih</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <C_ListData
                                        DATA={DATA}
                                        Action_Ambil_Alih={Action_Ambil_Alih}
                                        Action_Kembalikan={Action_Kembalikan}
                                    />
                                </tbody>
                            </table>
                        </StyledTable>
                    </div>

                    <div className={CCP['TableData__Filter']}>
                        <Structure style={"contained"}>
                            <Link href={"/App/KendaraanDinas/AdminKD"} >Kembali</Link>
                        </Structure>

                    </div>
                </div>


            </div>

        </>
    )
}




