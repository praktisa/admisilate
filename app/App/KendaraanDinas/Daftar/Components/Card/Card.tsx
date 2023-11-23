import React from 'react'
import C from './Card.module.css'
import ImageFill from '../Image/ImageFill'


interface Card__Inter {
    name: string, plat: string, img: string, booked: string
}

interface SeksiPanjang__inter {
    [key: string]: string
}

export default function Card({ name, plat, img, booked = "" }: Card__Inter) {

    const SeksiPanjang: SeksiPanjang__inter = {
        'Subbagian Umum dan Kepatuhan Internal': 'SUKI',
        'Seksi Penjaminan Kualitas Data': 'PKD',
        'Seksi Pemeriksaan, Penilaian, dan Penagihan': 'P3',
        'Seksi Pelayanan': 'Pelayanan',
        'Fungsional Pemeriksa Pajak': 'FPP',
        'Seksi Pengawasan I': 'WAS I',
    }


    function CheckBooked(booked: string) {

        if (booked != "") {
            let isBooked = ""
            let Array_Date_Keys = Object.keys(JSON.parse(booked))
            let Array_Date_Values = Object.values(JSON.parse(booked))

            let Today = new Date().setHours(0, 0, 0, 0)

            for (var i = 0; i < Array_Date_Keys.length; i++) {
                let Compare = new Date(Array_Date_Keys[i]).setHours(0, 0, 0, 0) === Today
                // console.log("Compare", Compare)

                if (Compare === true) {
                    isBooked = SeksiPanjang[`${Array_Date_Values[i]}`]
                    break;
                }
            }

            return isBooked
        } else {
            return ""
        }
    }



    function BookedBy() {

        let BookedCheck = booked != "" ? CheckBooked(booked) : ""

        if (BookedCheck.length != 0) {
            return (
                <>
                    <div className={C['Container__Booked']}>
                        HARI INI <br />
                        TERPINJAM OLEH <br />
                        {BookedCheck}
                    </div>
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }

    return (
        <>
            <div className={C['Container']}>
                <div className={C['Container__Image']}>

                    <BookedBy />
                    <ImageFill
                        src={img}
                        animated={false}
                        hover={true}
                        quality={40}
                    />

                    <div className={C['Container__Info']}>
                        {name}
                    </div>
                </div>

            </div>


        </>
    )
}

export function CardGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className={C['CardGrid']}>
            {children}
        </div>
    )
}