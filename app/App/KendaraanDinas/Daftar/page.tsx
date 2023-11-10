import React, { Fragment } from 'react'

import { READ_SEMUA_KENDARAAN_DINAS } from './Action/CRUD/DaftarKD_CRUD'
import Card, { CardGrid } from './Components/Card/Card'
import Link from 'next/link'

export default async function KendaraanDinasPage() {

    const SemuaKendaraanDinas = await READ_SEMUA_KENDARAAN_DINAS()

    return (
        <>
            <h1>Daftar Kendaraan Dinas</h1>
            <CardGrid>
                {
                    SemuaKendaraanDinas.map((SKD: any, i: number) => {

                        return (
                            <Fragment key={SKD.STR_PLAT}>
                                <Link key={SKD.STR_PLAT} href={`KendaraanDinas/peminjaman/${SKD.ID}`} scroll={false}>
                                    <Card
                                        name={SKD.STR_NAMA}
                                        plat={SKD.STR_PLAT}
                                        img={SKD.ID}
                                    />
                                </Link>
                            </Fragment>
                        )
                    })
                }
            </CardGrid>
        </>
    )
}
