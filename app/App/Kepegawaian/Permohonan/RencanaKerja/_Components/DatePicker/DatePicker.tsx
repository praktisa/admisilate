'use client'
import React, { useRef } from 'react'
import DP from './DatePicker.module.css'

export default function DatePicker({ Q = 2 }: { Q?: number }) {

    function Today() {
        let D = new Date()
        let tgl = D.getDate()
        let bln = D.getMonth() + 1
        let thn = D.getFullYear()

        let tglFix = tgl >= 10 ? tgl : '0' + tgl
        let blnFix = bln >= 10 ? bln : '0' + bln

        return (thn + "-" + blnFix + "-" + tglFix)
    }

    const DateRef = useRef<HTMLInputElement>(null)

    // console.log("DateRef", DateRef)

    return (
        <>
            <input
                required
                ref={DateRef}
                id="dari"
                type='date'
                defaultValue={Today()}
                className={DP['inputBorder']}
            />
            {/* - <input id="sampai" type='date' defaultValue={Today()} required /> */}
        </>
    )
}
