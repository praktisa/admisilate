'use client'
import FETCH_GET_DATA_MOBIL_ALTERNATIF from '@/app/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_DATA_MOBIL_ALTERNATIF/fetch'
import React, { useState, useEffect, Fragment } from 'react'
import KDP from './KDPicker.module.css'
import Structure from '@/Global/Components/CTA/Structure'
import ImageFill from '@/app/App/KendaraanDinas/Daftar/Components/Image/ImageFill'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'
import SliderContainer from '@/app/App/KendaraanDinas/AdminKD/_Components/SliderContainer'


interface StatePicker__inter {
    [key: string]: string
}


interface Selected__inter {
    [key: string]: { [key: string]: string }
}

interface CardMobil__inter {
    ID: string,
    imgBlob: any,
    MobilName: string,
    GroupTglMob: string,
    DateTime: Selected__inter,
    setDateTime: any
}

function DateStringtoIndonesian(tgl: string) {
    let ArrayDate = tgl.split("-")

    let Bulan: any = {
        "01": "Januari",
        "02": "Februari",
        "03": "Maret",
        "04": "April",
        "05": "Mei",
        "06": "Juni",
        "07": "Juli",
        "08": "Agustus",
        "09": "September",
        "10": "Oktober",
        "11": "November",
        "12": "Desember"
    }

    // return `${ArrayDate[2]} ${Bulan[ArrayDate[1]]} ${ArrayDate[0]}`
    return `${ArrayDate[2]} ${Bulan[ArrayDate[1]]}`
}

export default function Label_KDPicker({ ImgMobil, DateTime, Open, setOpen, setDateTime }:
    {
        ImgMobil: any, DateTime: Selected__inter, Open: boolean, setOpen: any, setDateTime: any
    }) {

    console.log("DateTime", DateTime)

    return (
        <>
            <label className={KDP['Label__Open']} htmlFor='Mobil' onClick={() => setOpen(true)} >

                <SliderContainer head="Mobil" >
                    <div className={KDP['Mobil__Preview__Container']}>
                        {
                            Object.values(DateTime).map((DTMob: any, i: number) => {

                                let Object_Blob: StatePicker__inter = {}
                                for (var o = 0; o < ImgMobil.length; o++) {
                                    Object.assign(Object_Blob,

                                        { [ImgMobil[o]['ID']]: ImgMobil[o]['BLOB_IMG'] })
                                }

                                let Nama = DTMob["STR_NAMA_MOBIL"] === ""
                                    ? DateStringtoIndonesian(Object.keys(DateTime)[i])
                                    : DateStringtoIndonesian(Object.keys(DateTime)[i]) + " - " + DTMob["STR_NAMA_MOBIL"]

                                return (
                                    <Fragment key={Nama + "Container"}>
                                        <div className={KDP['Mobil__Card__Container']}>
                                            <RealCard_Mobil imgBlob={Object_Blob[DTMob["ID_MOBIL"]]} MobilName={Nama} />
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                    </div>


                </SliderContainer>
            </label>

            {
                Open === true
                    ?
                    <KDPicker
                        ImgMobil={ImgMobil}

                        Open={Open}
                        setOpen={setOpen}

                        DateTime={DateTime}
                        setDateTime={setDateTime}

                    />
                    :
                    <>
                    </>
            }

        </>
    )
}

function RealCard_Mobil({ imgBlob, MobilName }: { imgBlob: any, MobilName: string }) {
    return (
        <>
            <div className={KDP['Mobil__Img__Container']}>

                <div className={KDP['Mobil__Img']}>
                    <ImageFill
                        src={imgBlob}
                        animated={false}
                        hover={false}
                        quality={40}
                        ifNull='Belum Pilih Mobil'
                    />
                </div>

            </div >
            <div className={KDP['Mobil__Text__Container']}>
                {MobilName}
            </div>
        </>
    )
}

export function KDPicker({ ImgMobil, DateTime, Open, setOpen, setDateTime }:
    { ImgMobil: any, DateTime: Selected__inter, Open: boolean, setOpen: any, setDateTime: any }
) {


    const [Mobil, setMobil] = useState<any>({})

    function BlobImg_ToObject(ImgMobil: any) {
        let Object_Blob = {}
        for (var i = 0; i < ImgMobil.length; i++) {
            Object.assign(Object_Blob, { [ImgMobil[i]['ID']]: ImgMobil[i]['BLOB_IMG'] })
        }

        return Object_Blob
    }

    let Object__Img = BlobImg_ToObject(ImgMobil) as StatePicker__inter

    async function GetMobilTersedia() {
        try {
            let Data = await FETCH_GET_DATA_MOBIL_ALTERNATIF(Object.keys(DateTime))
            Data && setMobil(Data)
        }
        catch (error) {
            console.log("Error", error)
        }

    }



    useEffect(() => {
        GetMobilTersedia()
    }, [Open])


    function CardMobil({ ID, imgBlob, MobilName, GroupTglMob, DateTime, setDateTime }: CardMobil__inter) {

        function CheckSelected(GroupTglMob: string, ID: string,) {
            if (DateTime[GroupTglMob]) {
                if (DateTime[GroupTglMob]['ID_MOBIL'] === ID) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }

        }

        function PilihMobil(GroupTglMob: string, ID: string, MobilName: string) {

            let OldData = { ...DateTime }

            if (GroupTglMob !== "Semua") {

                OldData[GroupTglMob]['ID_MOBIL'] = ID
                OldData[GroupTglMob]['STR_NAMA_MOBIL'] = MobilName

                setDateTime(OldData)
            } else {
                let NewData = {}

                Object.keys(OldData).map((DT, i) => {
                    Object.assign(NewData, { [DT]: { "WAKTU": OldData[DT]['WAKTU'], "ID_MOBIL": ID, "STR_NAMA_MOBIL": MobilName } })
                })

                setDateTime(NewData)
            }

        }

        return (
            <>
                <label htmlFor={ID + GroupTglMob} >
                    <div className={KDP['Mobil__Card__Container']}>
                        <input
                            // onChange={() => UserSelect(GroupTglMob, ID, MobilName)}
                            onChange={() => PilihMobil(GroupTglMob, ID, MobilName)}

                            input-type="hidden"
                            type='radio'
                            name={`Pilihan_Mobil_${GroupTglMob}`}
                            id={ID + GroupTglMob}

                            defaultChecked={CheckSelected(GroupTglMob, ID)}
                        />

                        <RealCard_Mobil imgBlob={Object__Img[ID]} MobilName={MobilName} />


                    </div>
                </label>
            </>
        )
    }

    return (
        <>


            <input input-type="hidden" type="checkbox" id="Mobil" className={KDP['Input__Checkox__Mobil']} />

            <div className={KDP['Container__Absolute__Mobil']} >
                <div className={KDP['Layout']} >
                    <div className={KDP['Layout_Date']} >
                        <h2>Pilih Mobil</h2>
                        <label className={KDP['Cancel']} htmlFor='Mobil' onClick={() => setOpen(false)} > &#x2715;</label>
                    </div>

                    <div scroll-type="horizontal" className={KDP['Layout_Mobil']}
                    // onClick={() => setRefresh(!refresh)} 
                    >
                        <div className={KDP['Container_Mobil']} >


                            {
                                Object.keys(Mobil).length !== 0
                                    ?
                                    Object.keys(Mobil).map((GroupTglMob, i) => {

                                        return (
                                            <Fragment key={GroupTglMob} >
                                                <details className={KDP['Mobil__Group__Container']} open={GroupTglMob === "Semua" ? true : false}>
                                                    <summary className={KDP['Mobil__Date__Group']} >
                                                        {GroupTglMob === "Semua" ? "Semua Tanggal" : DateStringtoIndonesian(GroupTglMob)}
                                                    </summary>

                                                    <div className={KDP['Mobil__Grid__Container']} >
                                                        {
                                                            Mobil[GroupTglMob].map((Mob: any, o: number) => {

                                                                return (
                                                                    <Fragment key={Mob.ID}>
                                                                        <CardMobil
                                                                            ID={Mob.ID}
                                                                            imgBlob={Object__Img[Mob.ID]}
                                                                            MobilName={Mob.STR_NAMA}
                                                                            GroupTglMob={GroupTglMob}
                                                                            DateTime={DateTime}
                                                                            setDateTime={setDateTime}
                                                                        />
                                                                    </Fragment>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </details>
                                            </Fragment>
                                        )
                                    })
                                    :
                                    <>
                                        <Fragment  >
                                            <details className={KDP['Mobil__Group__Container']} >
                                                <summary className={`${KDP['Mobil__Date__Group']}`} >
                                                    <Shimerloading loop={0} />
                                                    Memuat ...
                                                </summary>

                                                <div className={KDP['Mobil__Grid__Container']} >

                                                </div>
                                            </details>
                                        </Fragment>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
