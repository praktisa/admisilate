import React, { Fragment } from 'react'

import Link from 'next/link'
import Card, { CardGrid } from '../Card/Card'

export default function CMP_DaftarMobil({ Data }: any) {

    const IMG_HREF = `/App/KendaraanDinas/Daftar/peminjaman/`
    return (
        <>
            <CardGrid>
                {
                    Data.map((SKD: any, i: number) => {
                        return (
                            <Fragment key={SKD.ID}>

                                <Link key={SKD.ID} href={`${IMG_HREF}${SKD.ID}`} scroll={false}>
                                    <Card
                                        name={SKD.STR_NAMA}
                                        plat={SKD.ID}
                                        img={SKD.ID}
                                        booked={SKD.OBJ_DATES_BOOKING.trim()}
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
