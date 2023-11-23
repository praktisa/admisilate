'use client'
import React, { useContext, useState } from 'react'
import FETCH_DELETE_ID_PINJAM from '../Action/api/HapusRiwayat/fetch'
import PortalKonfirmation from '@/Global/Components/Portal/PortalKonfirmation/PortalKonfirmation'
import S_ModalDelete from './S_ModalDelete'

import { ModalContext } from '@/Global/Components/Portal/PortalKonfirmation/PortalKonfirmation'
import C_Structure from '@/Global/Components/CTA/C_Structure'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'


interface HapusRiwayat_Inter {
    DataPinjam: any
}

export default function HapusRiwayat({ DataPinjam }: HapusRiwayat_Inter) {

    const [LoadingProcess, setLoadingProcess] = useState<boolean>(false)

    async function UserDelete(ID_PINJAM: string, ID_MOBIL: string,) {
        setLoadingProcess(true)

        await FETCH_DELETE_ID_PINJAM(ID_PINJAM, ID_MOBIL).then(() => {
            setLoadingProcess(false)
        })
    }

    function ButtonDelete() {
        return (
            <C_Structure style="danger" onClick={() => UserDelete(DataPinjam.ID_PINJAM, DataPinjam.ID_MOBIL)} >
                {LoadingProcess === true ? <Shimerloading loop={0} /> : <></>}
                {LoadingProcess === true ? "Menghapus" : "Hapus"}
            </C_Structure>
        )
    }

    return (
        <>
            <PortalKonfirmation
                onOpen={
                    <C_Structure style="danger">Hapus</C_Structure>
                }
            >
                <S_ModalDelete
                    batal={<Konfirmation_Batal />}
                    hapus={<ButtonDelete />}
                    mobil={DataPinjam.STR_NAMA_KENDARAAN}
                />
            </PortalKonfirmation>
        </>
    )
}

export function Konfirmation_Batal() {

    const BatalToggle = useContext(ModalContext)
    console.log("BatalToggle", BatalToggle.Show, ModalContext)

    return (
        <>
            <C_Structure
                onClick={() => BatalToggle.Show(false)}
                style="outlined"
            >
                Batal
            </C_Structure>

        </>
    )
}

