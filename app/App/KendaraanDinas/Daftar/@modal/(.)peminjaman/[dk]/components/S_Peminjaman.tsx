import React from 'react'
import P from './Peminjaman.module.css'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'

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

export function Container_Form_Page({ children }: Container_Interception__inter) {
    return (
        <div className={P['Container_Form_Page']}>{children}</div>
    )
}


export function GridTujuanLokasi({ children }: Container_Interception__inter) {
    return (
        <div className={P['GridTujuanLokasi']}>
            {children}


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


export function SubmitForm({ disabled, Value }: { disabled: boolean, Value: string }) {

    let ValueSubmit = disabled === true ? "Memproses" : Value

    return (
        <>
            {
                disabled === true ? <Shimerloading loop={0} /> : <></>
            }
            <input
                id={"Label_Next"}
                style={{ display: "none" }}
                className={P['SubmitForm']}
                type='submit'
                value={ValueSubmit}
                disabled={disabled}
            />
        </>

    )
}


export function LoadingSubmit({ msg = "Berhasil" }: { msg: string }) {
    return (
        <>
            <h2 className={P['LoadingSubmit']}>
                {msg}
            </h2>
        </>
    )
}