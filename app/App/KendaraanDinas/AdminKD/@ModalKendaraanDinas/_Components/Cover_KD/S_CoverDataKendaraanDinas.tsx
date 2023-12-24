import Link from 'next/link'
import React, { Fragment } from 'react'
import S_CardKD from '../S_CardKD'
import DKD from './S_CoverDataKD.module.css'
import ImageFill from '../../../../Daftar/Components/Image/ImageFill'

export default function S_CoverDataKendaraanDinas({ DataSemuaKD }: { DataSemuaKD: any }) {



    return (
        <>
            <div className={DKD['overflow']} >
                <div className={DKD['CoverDataKendaraanDinas__Flex']}>

                    <Link href="http://localhost:3000/App/KendaraanDinas/AdminKD/DataKendaraanDinas">
                        <div className={DKD['CoverDataKendaraanDinas__Container']} >
                            <div className={DKD['CoverDataKendaraanDinas__AddMobil']} >
                                &#x2b;
                            </div>
                            <div className={DKD['CoverDataKendaraanDinas__Nama']} >Tambah Mobil Dinas</div>
                        </div>
                    </Link>

                    {
                        DataSemuaKD.map((DSKD: any, i: number) => {

                            return (
                                <Fragment key={DSKD.STR_NAMA + i}>

                                    <div className={DKD['CoverDataKendaraanDinas__Container']} >
                                        <Link href={`http://localhost:3000/App/KendaraanDinas/AdminKD/DataKendaraanDinas/${DSKD.ID}`}>


                                            <ImageFill
                                                src={DSKD.BLOB_IMG}
                                                animated={false}
                                                quality={100}
                                                hover={false}
                                            />

                                            <div className={DKD['CoverDataKendaraanDinas__Nama']} >{DSKD.STR_NAMA}</div>
                                        </Link>
                                    </div>
                                </Fragment>
                            )
                        })
                    }
                </div>
            </div>



        </>
    )
}
