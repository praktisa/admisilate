'use client'
import React, { Fragment, useOptimistic } from 'react'
import PenyingkatSeksi from '@/Global/function/PenyingkatSeksi'

import C_ButtonForm from './C_ButtonForm'

interface C_ListData__inter {
    DATA: any,
    Action_Ambil_Alih: any,
    Action_Kembalikan: any
}

export default function C_ListData({ DATA, Action_Ambil_Alih, Action_Kembalikan }: C_ListData__inter) {


    let Today = new Date()
    let TGL_TODAY = `${Today.getDate()}-${Today.getMonth() + 1}-${Today.getFullYear()}`

    const [optimisticState, addOptimistic] = useOptimistic(
        DATA,
        // updateFn
        (currentState, DataChange: any) => {
            // merge and return new state
            // with optimistic value
            let NewState = [...currentState]
            NewState[DataChange.index]['STR_PEMINJAM'] = DataChange.STR_PEMINJAM
            NewState[DataChange.index]['STR_TUJUAN'] = DataChange.STR_TUJUAN
            NewState[DataChange.index]['STR_APPROVE'] = DataChange.STR_APPROVE
            NewState[DataChange.index]['ID_STATUS'] = DataChange.ID_STATUS

            return NewState
        }
    )

    // console.log("optimisticState", optimisticState)''

    async function ActionData(formData: FormData, TUJUAN: string, i: number) {

        if (TUJUAN != "Digunakan Umum (Mandatory)") {

            let HasilAmbil = await Action_Ambil_Alih(formData)

            addOptimistic({
                "index": i,
                "STR_PEMINJAM": HasilAmbil.STR_PEMINJAM,
                "STR_TUJUAN": HasilAmbil.STR_TUJUAN,
                "STR_APPROVE": HasilAmbil.STR_APPROVE,
                "ID_STATUS": HasilAmbil.ID_STATUS
            })

        } else {

            let DataPeminjam = await Action_Kembalikan(formData)

            addOptimistic({
                "index": i,
                "STR_PEMINJAM": DataPeminjam.STR_PEMINJAM,
                "STR_TUJUAN": DataPeminjam.STR_TUJUAN,
                "STR_APPROVE": 1,
                "ID_STATUS": DataPeminjam.ID_STATUS
            })
        }
    }

    return (
        <>
            {
                optimisticState.map((datas: any, i: number) => {

                    let MOBIL = datas['STR_NAMA_KENDARAAN']
                    let PEMINJAM = datas['STR_PEMINJAM']
                    let TUJUAN = datas['STR_TUJUAN']

                    let TGL = new Date(datas['STR_DATE'])
                    let TGL_STR = `${TGL.getDate()}-${TGL.getMonth() + 1}-${TGL.getFullYear()}`
                    let TGL_STR_DIBALIK = `${TGL.getFullYear()}-${TGL.getMonth() + 1}-${TGL.getDate()}`

                    TGL_STR === TGL_TODAY ? TGL_STR = "Hari Ini" : TGL_STR


                    return (
                        <Fragment key={i + MOBIL + PEMINJAM}>
                            <tr style={{ height: "62px" }}>

                                <td >{TGL_STR}</td>
                                <td>{MOBIL}</td>
                                <td>{PenyingkatSeksi(PEMINJAM)}</td>
                                <td>{TUJUAN}</td>
                                <td>
                                    <div style={{ display: "grid", gap: "10px", placeItems: "center" }}>

                                        <form action={(FormData) => ActionData(FormData, TUJUAN, i)}>

                                            {
                                                TUJUAN !== "Digunakan Umum (Mandatory)"
                                                    ?
                                                    PenyingkatSeksi(PEMINJAM) !== "SUKI"
                                                        ?
                                                        <C_ButtonForm htmlFor={datas.ID} TUJUAN={TUJUAN} />
                                                        :
                                                        <></>
                                                    :
                                                    <C_ButtonForm htmlFor={datas.ID} TUJUAN={TUJUAN} />
                                            }


                                            <input input-type="hidden" type="text" name="ID_REGISTER" defaultValue={datas.ID} />
                                            <input input-type="hidden" type="text" name="STR_APPROVE" defaultValue={datas.STR_APPROVE} />
                                            <input input-type="hidden" type="text" name="ID_STATUS" defaultValue={datas.ID_STATUS} />
                                            <input input-type="hidden" type="text" name="TGL" defaultValue={TGL_STR_DIBALIK} />
                                            <input input-type="hidden" type='submit' id={datas.ID} />
                                        </form>

                                    </div>

                                </td>
                            </tr>
                        </Fragment>
                    )
                })
            }
        </>
    )
}


