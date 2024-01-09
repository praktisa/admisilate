'use client'
import React, { useContext, useState } from 'react'
import FETCH_DELETE_ID_PINJAM from '../Action/api/HapusRiwayat/fetch'
import PortalKonfirmation from '@/Global/Components/Portal/PortalKonfirmation/PortalKonfirmation'
import S_ModalDelete from './S_ModalDelete'

import { ModalContext } from '@/Global/Components/Portal/PortalKonfirmation/PortalKonfirmation'
import C_Structure from '@/Global/Components/CTA/C_Structure'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'
import { useRouter } from 'next/navigation'
import { Icon } from '@/Global/Components/CTA/Structure'


interface HapusRiwayat_Inter {
    DataPinjam: any
}

export default function HapusRiwayat({ DataPinjam }: HapusRiwayat_Inter) {

    const [LoadingProcess, setLoadingProcess] = useState<boolean>(false)
    const [LoadMSG, setLoadMSG] = useState("Menghapus")
    const router = useRouter()
    // console.log("DataPinjam", DataPinjam)

    async function UserDelete(ID_PINJAM: string, ID_MOBIL: string,) {
        setLoadingProcess(true)

        await FETCH_DELETE_ID_PINJAM(ID_PINJAM, ID_MOBIL).then(async (res) => {
            setLoadMSG(res)
        }).then(() => {
            router.refresh()
        })
    }

    function ButtonDelete() {
        return (
            <C_Structure style={LoadMSG != "Berhasil" ? "danger" : "success"} onClick={() => UserDelete(DataPinjam.ID_STATUS, DataPinjam.STR_ID_KENDARAAN)} >
                {LoadingProcess === true ? <Shimerloading loop={0} /> : <></>}
                {LoadingProcess === true ? LoadMSG : "Hapus"}
            </C_Structure>
        )
    }

    return (
        <>
            <PortalKonfirmation
                onOpen={
                    <C_Structure style="dangerHover">
                        <Icon>
                            &#128465;
                        </Icon>

                    </C_Structure>
                }
            >
                <S_ModalDelete
                    batal={<Konfirmation_Batal LoadingProcess={LoadingProcess} />}
                    hapus={<ButtonDelete />}
                    mobil={DataPinjam.STR_NAMA_KENDARAAN}
                />
            </PortalKonfirmation>
        </>
    )
}

export function Konfirmation_Batal({ LoadingProcess }: { LoadingProcess: boolean }) {

    let BatalToggle: any

    if (useContext != null) {
        BatalToggle = useContext(ModalContext)
    }


    return (
        <>
            <C_Structure
                onClick={() => { LoadingProcess === true ? null : BatalToggle.Show(false) }}
                style="outlined"
            >
                Batal
            </C_Structure>

        </>
    )
}

