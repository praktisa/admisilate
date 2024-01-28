'use client'
import React from 'react'
import { getCookie } from 'cookies-next'

export default function PegawaiDisplayer({ data }: { data: Object }) {

    function GetCookieListPegawaiRK() {
        let Cookie = getCookie("ListPegawaiRK")
        console.log("cookie", JSON.parse(Cookie))
    }

    return (
        <span onClick={() => GetCookieListPegawaiRK()}>PegawaiDisplayer</span>
    )
}
