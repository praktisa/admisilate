import React from 'react'
import StyledTable from '@/Global/Components/Table/StyledTable'

interface children {
    children: React.ReactNode
}

export default function S_TabelRiwayat({ children }: children) {

    return (
        <>
            <form >
                <StyledTable>
                    <table border={0} >
                        <thead>
                            <tr style={{ width: "100%" }}>
                                <th style={{ width: "15%" }}>Mobil</th>
                                <th style={{ width: "20%" }}>Tujuan</th>
                                <th style={{ width: "30%" }}>Tanggal</th>
                                <th style={{ width: "10%" }}>Status</th>
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
