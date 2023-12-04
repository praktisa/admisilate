import React from 'react'
import StyledTable from '@/Global/Components/Table/StyledTable'
import { Action_Selection_Delete } from '../@RiwayatPinjam/(.)EditPeminjaman/[dk]/[update]/Action/ActionUbahdanHapus'

interface children {
    children: React.ReactNode
}

export default function S_TabelRiwayat({ children }: children) {

    return (
        <>
            <form action={Action_Selection_Delete}>
                <StyledTable>
                    <table border={0} >
                        <thead>
                            <tr style={{ width: "100%" }}>
                                <th style={{ width: "20%" }}>Mobil</th>
                                <th style={{ width: "20%" }}>Status</th>
                                <th style={{ width: "40%" }}>Tanggal</th>
                                <th style={{ width: "20%" }}>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {children}

                        </tbody>

                    </table>
                </StyledTable>
            </form>

        </>
    )
}
