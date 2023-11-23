import React from 'react'
import { READ_PEMINJAMAN_MOBIL_BY_SESSION } from './Action/Riwayat_CRUD'
import Link from 'next/link'
import HapusRiwayat from './_Component/C_HapusRiwayat'
import Structure from '@/Global/Components/CTA/Structure'





export default async function RiwayatKD_page() {


    const Data = await READ_PEMINJAMAN_MOBIL_BY_SESSION()

    console.log("DATA RIWAYAT", Data)

    function ShowListRiwayat({ Data }: { Data: string[] }) {
        return (
            <>
                {
                    Data.map((DataPinjam: any, i: number) => {

                        return (
                            <tr key={DataPinjam.ID_STATUS}>

                                <td>{DataPinjam.STR_NAMA_KENDARAAN}</td>
                                <td>{DataPinjam.STR_STATUS}</td>
                                <td>
                                    <div>

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
                                <td>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <Link
                                            href={`/App/KendaraanDinas/Riwayat/EditPeminjaman/${DataPinjam.STR_ID_KENDARAAN}/${DataPinjam.ID_STATUS}`}
                                        >
                                            <Structure style="outlined">Ubah</Structure>
                                        </Link>

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
        </>
    )
}
