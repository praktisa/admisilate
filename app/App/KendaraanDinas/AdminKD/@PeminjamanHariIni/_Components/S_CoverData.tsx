import React, { Fragment } from 'react'
import StyledTable from '@/Global/Components/Table/StyledTable'
import Link from 'next/link'
import PenyingkatSeksi from '@/Global/function/PenyingkatSeksi'

export default function S_CoverData({ HARI_INI }: { HARI_INI: object[] }) {


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
                                            <tr style={{ height: "62px" }}>
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