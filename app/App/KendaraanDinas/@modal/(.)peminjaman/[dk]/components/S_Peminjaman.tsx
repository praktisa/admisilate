import React from 'react'
import P from './Peminjaman.module.css'
import { PinjamMobil } from '../Action/ActionPinjam'
import TextArea from '@/Global/Components/Input/TextArea/TextArea'

interface Container_Interception__inter {
    children: React.ReactNode
}

export function Container_Interception({ children }: Container_Interception__inter) {
    return (
        <div className={P['Container_Interception']}>{children}</div>
    )
}


export function Container_Form({ children }: Container_Interception__inter) {
    return (
        <div className={P['Container_Form']}>{children}</div>
    )
}

export function FormPeminjaman({ children }: Container_Interception__inter) {
    return (
        <form className={P['FormPeminjaman']} action={PinjamMobil}>{children}</form>
    )
}

export function GridTujuanLokasi() {
    return (
        <div className={P['GridTujuanLokasi']}>

            <TextArea label={"Tujuan Penggunaan"} rows={1} />
            <TextArea label={"Lokasi Kegiatan"} rows={1} />

        </div>
    )
}

interface SegmentForm__inter {
    label: string, before?: React.ReactNode, after: React.ReactNode,
    children: React.ReactNode
}

export function SegmentForm({ label, after = <div></div>, before = <div></div>, children }: SegmentForm__inter) {
    return (
        <>

            <input className={P['SegmentForm__Radio']} type="radio" name={"Segment"} id={label} defaultChecked />
            <div className={P['SegmentForm__Grid']}>

                <h3 className={P['SegmentForm__Title']}>{label}</h3>
                <div className={P['SegmentForm__Content']}>
                    {children}
                </div>

                <div className={P['SegmentForm__Footer']}>
                    {before}
                    {after}
                </div>

            </div>
        </>
    )
}

export function NamaKendaraan({ nama }: { nama: string }) {
    return (
        <>
            <div className={P['NamaKendaraan']}>
                {nama}
            </div>
        </>
    )
}


export function SubmitForm() {
    return (
        <input className={P['SubmitForm']} type='submit' value={"Pinjam"} />
    )
}