// import Notifikasi from '@/Global/Notifikasi/Notifikasi'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <>
            <div>  <Link href={`KendaraanDinas/Daftar`}> Menuju Daftar</Link>
                <Link href={`KendaraanDinas/Riwayat`}> Menuju Riwayat</Link></div>

        </>
    )
}
