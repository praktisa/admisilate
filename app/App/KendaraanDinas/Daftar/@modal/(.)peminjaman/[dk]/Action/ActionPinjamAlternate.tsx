'use server'
import 'server-only'

import { READ_NIP_BY_SESSION } from '@/app/Auth/action/function/Session'
import { AmbilDataPegawaiDariJSONDirectory } from '@/app/Auth/action/function/function'

import { cookies } from 'next/headers'
import KlasifikasiSeksiPegawai from './KlasifikasiSeksiPegawai'


import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { CEK_REGISTER, CREATE_REGISTER } from '@SchemaKD/schema_tb_kendaraan_register'
import { CREATE_PINJAM__MOBIL } from '@SchemaKD/schema_tb_kendaraan_status'
import { UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL } from '@SchemaKD/schema_tb_kendaraan'
import { CREATE_KENDARAAN_DINAS_ALTERNATIF, DELETE_KENDARAAN_DINAS_ALTERNATIF_BY_ID } from '@/app/App/KendaraanDinas/_Schema/schema_tb_kendaraan_alternatif'


export async function DataProcessing(formData: FormData, Fix_ID: string, Fix_Name: string, Fix_Tgl: string) {

    let SessionCookie = cookies().get("session")?.value
    let NIP = await READ_NIP_BY_SESSION(SessionCookie)
    let DataPegawai = await AmbilDataPegawaiDariJSONDirectory(NIP)
    let Peminjam = KlasifikasiSeksiPegawai(DataPegawai)


    // tanggal belum masuk surya update yaa :)

    let ValueAdd = {
        "STR_ID_KENDARAAN": Fix_ID,
        "STR_NAMA_KENDARAAN": Fix_Name,
        "STR_NIP9": await READ_NIP_BY_SESSION(SessionCookie),

        "STR_PEMINJAM": Peminjam,
        "STR_TGL": Fix_Tgl,
        "STR_TEMPAT": formData.get("STR_TEMPAT") as string,
        "STR_TUJUAN": formData.get("STR_TUJUAN") as string,
        "STR_STATUS": "Terpinjam"
    }


    return ValueAdd
}


export async function ActionPinjamMobilAlternate(formData: FormData) {


    let ID = formData.getAll("STR_ID_KENDARAAN") as string[]
    let NAMA = formData.getAll("STR_NAMA_KENDARAAN") as string[]
    let TGL = (formData.get("ARRAY_TANGGAL") as string).split(",") as string[]

    let FixMobil: any = {}

    for (var i = 0; i < ID.length; i++) {
        if (ID[i] !== "") {
            if (!FixMobil[ID[i]]) {
                Object.assign(FixMobil, {
                    [ID[i]]: {
                        "Mobil": NAMA[i],
                        "Tanggal": [TGL[i]]
                    }
                })

            } else {
                FixMobil[ID[i]]['Tanggal'].push(TGL[i])
            }
        }
    }


    let Fix_ID = Object.keys(FixMobil) as string[]
    let Fix_Data = Object.values(FixMobil) as any

    let ValueAdd: any = {}

    let ReturnedFetch: any = {}

    for (var i = 0; i < Fix_ID.length; i++) {

        if (Fix_ID[i] !== "") {
            ValueAdd = await DataProcessing(formData, Fix_ID[i], Fix_Data[i].Mobil, Fix_Data[i].Tanggal)

            try {
                await CEK_REGISTER(Fix_Data[i].Tanggal, Fix_Data[i].Mobil)
                    .then(async (HASIL_CEK_REGISTER) => {

                        ValueAdd.STR_TGL = JSON.stringify(HASIL_CEK_REGISTER['0'])
                        let ID_INSERTED = await CREATE_PINJAM__MOBIL(ValueAdd)

                        await CREATE_REGISTER(ID_INSERTED, Fix_ID[i], Fix_Data[i].Mobil, HASIL_CEK_REGISTER['0'], ValueAdd.STR_PEMINJAM)

                        await UPDATE_OBJ_DATES_BOOKING_MOBIL_FROM_REGISTER_BY_ID_MOBIL(ValueAdd.STR_ID_KENDARAAN)



                        if (!ReturnedFetch['0'] && !ReturnedFetch['1']) {
                            Object.assign(ReturnedFetch, { "0": HASIL_CEK_REGISTER[0], "1": HASIL_CEK_REGISTER[1] })

                        } else {
                            ReturnedFetch['0'] = [...ReturnedFetch['0'], ...HASIL_CEK_REGISTER[0]]
                            ReturnedFetch['1'] = [...ReturnedFetch['1'], ...HASIL_CEK_REGISTER[1]]
                        }

                        await DELETE_KENDARAAN_DINAS_ALTERNATIF_BY_ID(formData.get("ID_ALTERNATIF") as string)
                    })

                revalidateTag(`${ValueAdd.STR_ID_KENDARAAN}`)
                revalidateTag('all_obj_dates')


            } catch (error) {
                return JSON.stringify(error)
            }
        }
    }

    // console.log("ReturnedFetch", ReturnedFetch)


    if (ReturnedFetch["1"].length > 0) {

        let Add_Alternate = {
            "STR_PEMINJAM": ValueAdd.STR_PEMINJAM,
            "STR_TGL_TERPESAN": JSON.stringify(ReturnedFetch["0"]),
            "STR_TUJUAN": ValueAdd.STR_TUJUAN,
            "STR_TEMPAT": ValueAdd.STR_TEMPAT,
        }

        try {
            let ID_CREATE = await CREATE_KENDARAAN_DINAS_ALTERNATIF(Add_Alternate)
            console.log("ID_CREATE", ID_CREATE.insertId)

            return {
                sebagian: true,
                id_alternate: ID_CREATE
            }

        } catch (error) {
            console.log("Error CREATE_KENDARAAN_DINAS_ALTERNATIF", error)
            return error
        }


    } else {
        return {
            sebagian: false,
            id_alternate: 0
        }
    }








}

