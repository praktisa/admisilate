// 'use client'
import React from 'react'
import FRK from './FormRK.module.css'
import Structure from '@/Global/Components/CTA/Structure'
import LabelArea from '@/Global/Components/Input/_Label/TextArea/LabelArea'
import DateTimePicker from './DateTimePickerWithCar/DateTimePickerWithCar'
import ListDataPicker2 from './ListDataPicker2/ListDataPicker2'

import Lokasi from '@/app/database/_private/DestinasiST/LokasiKegiatan.json'
import Pegawai from '@/app/database/_private/Pegawai.json'
import MultipleInput from './MultipleInput/MultipleInput'



export default function FormRK({ ImgMobil }: { ImgMobil: any }) {

    function temporaryFunc_ConverToArray(Lokasi: any) {
        let Keys: string[] = Object.keys(Lokasi)
        let Values: string[] = Object.values(Lokasi)
        let ReturnedData = []

        if (Keys != undefined && Values != undefined) {
            for (var i = 0; i < Keys.length; i++) {
                let ObjectData = {}

                if (!Values[i].includes("()")) {
                    let Grp = Values[i].split('(').pop()?.replaceAll(")", "")
                    ObjectData = { "id": Keys[i], "lokasi": Values[i], "group": Grp }
                } else {
                    ObjectData = { "id": Keys[i], "lokasi": Values[i], "group": "LAINNYA" }
                }

                ReturnedData.push(ObjectData)
            }
        }


        return (ReturnedData)
    }

    function FormSection({ title, children }: { title: string, children: React.ReactNode }) {
        return (
            <div className={FRK['Input__Container']} >
                <div className={FRK['Container__Head']} >
                    <h2>{title}</h2>
                </div>
                <div scroll-type="vertical" className={FRK['Container__InputData']} >
                    {children}
                </div>
            </div>
        )
    }

    function FormLine({ children, num, title }: { children: React.ReactNode, num: string, title: string }) {
        return (
            <>
                <div className={FRK['Input__Line']} >
                    <div className={FRK['Line__Circle']} style={num !== "" ? { visibility: "visible" } : { visibility: "hidden" }} >
                        {num}
                    </div>
                    <div className={FRK['Line__Content']}>
                        <div className={FRK['Content__Title']}>
                            {title}
                        </div>
                        <div className={FRK['Content']}>
                            {children}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    function LabelNav({ children, For }: { children: React.ReactNode, For: string, }) {
        return (
            <label label-target={For} htmlFor={For}>
                <div className={FRK['Container__Number']}>
                    <div className={FRK['Nav__Circle']} ></div>
                    <div className={FRK['Nav__Info']} >{children}</div>
                </div>
            </label>
        )
    }

    return (
        <>
            <div className={FRK['Container__Form']} >

                <div className={FRK['Form__Area__Input']}>

                    <input server-form="primary" label-target="Informasi Rencana" className={FRK['Radio__Input__Container']} type="radio" id="Informasi Rencana" name="Section" defaultChecked />
                    <FormSection title='Informasi Rencana'>

                        <FormLine num={"1"} title={"Tanggal, Waktu, dan Mobil"} >
                            <DateTimePicker ImgMobil={ImgMobil} />
                        </FormLine>

                        <FormLine num={"2"} title={"Agenda"} >
                            <LabelArea htmlFor='Agenda' label={""} >
                                <textarea server-form="primary" rows={2} spellCheck="false" id={"Agenda"} name="Agenda" placeholder={``} required minLength={5} ></textarea>
                            </LabelArea>
                        </FormLine>

                        <FormLine num={"3"} title={"Lokasi Spesifik"} >
                            <LabelArea htmlFor='Lokasi_Spesifik' label={""} >
                                <textarea server-form="primary" rows={2} spellCheck="false" id={"Lokasi_Spesifik"} name="Lokasi_Spesifik" placeholder={``} required minLength={4} ></textarea>
                            </LabelArea>
                        </FormLine>


                        <FormLine num={"4"} title={"Lokasi Kabupaten"} >
                            <ListDataPicker2
                                data={temporaryFunc_ConverToArray(Lokasi)}
                                dataDisplay={'lokasi'}
                                idDisplay={'id'}
                                group={'group'}
                                placeholder='Cari Kabupaten ...'
                                filterOpt={[]}
                                CookieName={'lokasiRK'}
                            />
                        </FormLine>


                        <FormLine num={""} title={""} >
                            <label htmlFor='Petugas'>
                                <Structure>
                                    Masukan Petugas
                                </Structure>
                            </label>
                        </FormLine>

                    </FormSection>

                    <input label-target="Petugas" className={FRK['Radio__Input__Container']} type="radio" id="Petugas" name="Section" />
                    <FormSection title='Petugas'>

                        <FormLine num={"5"} title={"Pegawai Kantor"} >
                            <ListDataPicker2
                                data={Pegawai}
                                dataDisplay={'NAMA PEGAWAI'}
                                placeholder='Cari Pegawai ...'
                                idDisplay={'IP Sikka'}
                                group={'UNIT ORGANISASI'}
                                filterOpt={['UNIT ORGANISASI', 'Jabatan', 'Pangkat/Golongan', 'grade', 'Nama Pendidikan Formal', 'agama', 'jenis kelamin']}
                                CookieName={'PegawaiRK'}
                            />
                        </FormLine>

                        <FormLine num={"6"} title={"Petugas Lainnya (Opsional)"} >
                            <MultipleInput
                                ArrayForm={["Nama", "NIP", "Pangkat", "Jabatan"]}
                                NameForm="Petugas_Lainnya_"
                                SectionNameForm="Petugas"
                            />
                        </FormLine>
                        <FormLine num={""} title={""} >
                            <label htmlFor='Lampiran'>
                                <Structure>
                                    Masukan Lampiran
                                </Structure>
                            </label>
                        </FormLine>

                    </FormSection>

                    <input label-target="Lampiran" className={FRK['Radio__Input__Container']} type="radio" id="Lampiran" name="Section" />
                    <FormSection title='Lampiran (Opsional)'>

                        <FormLine num={"7"} title={"Lampiran Data Wajib Pajak"} >
                            <MultipleInput
                                ArrayForm={["Nama Wajib Pajak", "NPWP", "Alamat"]}
                                NameForm="Lampiran_Wajib_"
                                SectionNameForm="Wajib Pajak"
                            />
                        </FormLine>

                        <FormLine num={""} title={""} >
                            <label htmlFor='Kendaraan Dinas'>
                                <Structure>
                                    Kirim
                                </Structure>
                            </label>
                        </FormLine>

                    </FormSection>
                </div>







                <div className={FRK['Form__Area__Nav']}>
                    <div className={FRK['Nav__Container']} >
                        <LabelNav For={"Informasi Rencana"}>Informasi Rencana</LabelNav>
                        <LabelNav For={"Petugas"}>Petugas</LabelNav>
                        <LabelNav For={"Lampiran"}>Lampiran</LabelNav>
                    </div>

                    <div className={FRK['Kirim__Container']} >
                        <button type='submit' >
                            <Structure style="contained">
                                Kirim
                            </Structure>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
