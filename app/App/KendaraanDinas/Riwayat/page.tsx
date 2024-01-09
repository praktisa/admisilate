import React from 'react'
import { READ_PEMINJAMAN_MOBIL_BY_SESSION } from '@SchemaKD/schema_tb_kendaraan_status'
import Link from 'next/link'
import HapusRiwayat from './_Component/C_HapusRiwayat'
import Structure, { Icon } from '@/Global/Components/CTA/Structure'
import S_TabelRiwayat from './_Component/S_TabelRiwayat'


export default async function RiwayatKD_page() {


    const Data = await READ_PEMINJAMAN_MOBIL_BY_SESSION()

    console.log("DATA RIWAYAT", Data)
    let Today = new Date()
    let Deadline = Today.setHours(17, 30)
    let TodayHours = Today.getHours()

    function ShowListRiwayat({ Data }: { Data: string[] }) {
        return (
            <>
                {
                    Data.map((DataPinjam: any, i: number) => {

                        return (
                            <tr key={DataPinjam.ID_STATUS}>

                                <td>
                                    {DataPinjam.STR_NAMA_KENDARAAN}
                                </td>

                                <td>
                                    {DataPinjam.STR_TUJUAN}
                                    <br />
                                    <br />
                                    📍 {DataPinjam.STR_TEMPAT}
                                </td>
                                <td>

                                    <div>
                                        {/* <span >detil</span> */}
                                        {
                                            JSON.parse(DataPinjam.STR_TGL).map((tgl: any, o: any) => {

                                                let parseDate = new Date(tgl)
                                                let Date_tgl = parseDate.getDate()
                                                let Date_bln = parseDate.getMonth() + 1

                                                return (
                                                    <>
                                                        <span key={tgl + DataPinjam.ID_STATUS}>{Date_tgl} / {Date_bln}</span>
                                                    </>
                                                )
                                            })
                                        }

                                    </div>
                                </td>
                                <td>{DataPinjam.STR_STATUS}</td>
                                <td>
                                    <div style={{ display: "flex", gap: "10px" }}>

                                        {
                                            Today < new Date((JSON.parse(DataPinjam.STR_TGL))[0]) && TodayHours < Deadline

                                                ?
                                                <Link
                                                    href={`/App/KendaraanDinas/Riwayat/EditPeminjaman/${DataPinjam.STR_ID_KENDARAAN}/${DataPinjam.ID_STATUS}`}
                                                >
                                                    <Structure style="outlined">
                                                        {/* <Icon> */}
                                                        Ubah
                                                        {/* </Icon> */}
                                                    </Structure>
                                                </Link>
                                                :
                                                <></>
                                        }

                                        {/* <Structure style="outlined">
                                            tukar?
                                            <Icon>
                                                &#8645;
                                            </Icon>
                                        </Structure> */}

                                        <HapusRiwayat
                                            DataPinjam={DataPinjam}
                                        />


                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </>
        )
    }

    return (
        <>
            <S_TabelRiwayat>
                {
                    Data.length != 0
                        ?
                        <ShowListRiwayat Data={Data} />
                        :
                        <>
                            <tr>
                                <td colSpan={5} rowSpan={2} style={{ textAlign: "center" }}>
                                    <Link href={'/App/KendaraanDinas/Daftar'}>
                                        <br />
                                        <h3>Belum Ada Riwayat Peminjaman 😅</h3>
                                        <br />
                                        <h3>Klik disini</h3>
                                        <br />
                                    </Link>
                                </td>
                            </tr>
                        </>
                }
            </S_TabelRiwayat>

        </>
    )
}
