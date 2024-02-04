'use server'
import { PinjamMobilState } from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/Action/ActionPinjam'
import KlasifikasiSeksiPegawai from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/Action/KlasifikasiSeksiPegawai'
import { READ_NIP_BY_SESSION } from '@/app/Auth/action/function/Session'
import { AmbilDataPegawaiDariJSONDirectory } from '@/app/Auth/action/function/function'
import { cookies } from 'next/headers'
import 'server-only'

function SplitDataChoice(Arr_data: string[]) {
    let Return_Obj = {}

    for (var i = 0; i < Arr_data.length; i++) {
        let Split = Arr_data[i].split(" - ")
        let NIP = Split[0]
        let NAMA = Split[1]

        Object.assign(Return_Obj, { [NIP]: NAMA })
    }

    return Return_Obj
}

function Array_Into_ArrayObject(Array: string[], TotalForm: string[]) {
    let Return_Arr = []

    let Data_Index = 0
    for (var o = 0; o < (Array.length / TotalForm.length); o++) {

        let Return_Obj = {}
        for (var i = 0; i < TotalForm.length; i++) {
            Object.assign(Return_Obj, { [TotalForm[i]]: Array[Data_Index] })
            Data_Index++
        }

        Return_Arr.push(Return_Obj)
    }
    return Return_Arr
}


function DeleteKey_From_OBJ(OBJ: { [key: string]: { [key: string]: string } }, ArrayKey: string[]) {

    let Values = Object.values(OBJ)
    for (var i = 0; i < Values.length; i++) {
        for (var o = 0; o < ArrayKey.length; o++) {
            delete Values[i][ArrayKey[o]]
        }
    }

    return OBJ
}


function Create_OBJ_TANGGAL_JAM(TanggalRK: string[], Dari_Jam: string[], Dari_Menit: string[], Sampai_Jam: string[], Sampai_Menit: string[]) {
    let Returned_Object = {}

    for (var i = 0; i < TanggalRK.length; i++) {
        Object.assign(Returned_Object,
            {
                [TanggalRK[i]]: `${TanggalRK[i]} | ${Dari_Jam[i]}:${Dari_Menit[i]} : ${Sampai_Jam[i]}:${Sampai_Menit[i]}`
            }
        )
    }

    return Returned_Object
}

async function GET_USER_INFO() {
    let SessionCookie = cookies().get("session")?.value
    let NIP = await READ_NIP_BY_SESSION(SessionCookie)
    let DataPegawai = await AmbilDataPegawaiDariJSONDirectory(NIP)
    let Peminjam = KlasifikasiSeksiPegawai(DataPegawai)


    return { NIP, Peminjam }
}

async function ProcessForm_For_RencanaKerja(formData: FormData) {

    let { NIP, Peminjam } = await GET_USER_INFO()


    // lanjut besok sur
    let CreateRK = {
        "STR_NIP9": NIP,
        "STR_PEMINJAM": Peminjam,
        "OBJ_ID_PINJAMAN": DeleteKey_From_OBJ(JSON.parse(formData.get("DateTimePicker_State") as string), ['WAKTU', 'ANIMATED']),
        "ARR_PETUGAS_ST": SplitDataChoice(formData.getAll("pilihan_NAMA PEGAWAI") as string[]),
        "OBJ_PETUGASLAIN_ST": Array_Into_ArrayObject(formData.getAll("Petugas_Lainnya_") as string[], ["Nama", "NIP", "Pangkat", "Jabatan"]),

        "OBJ_TANGGAL_JAM": Create_OBJ_TANGGAL_JAM(
            formData.getAll("TanggalRK") as string[],
            formData.getAll("Dari_Jam") as string[],
            formData.getAll("Dari_Menit") as string[],
            formData.getAll("Sampai_Jam") as string[],
            formData.getAll("Sampai_Menit") as string[]
        ),
        "STR_TEMPAT_ID_KABUPATEN": SplitDataChoice(formData.getAll("pilihan_lokasi") as string[]),
        "STR_TEMPAT_SPESIFIK": formData.get("Lokasi_Spesifik") as string,
        "STR_AGENDA": formData.get("Agenda") as string,
        "ARR_OBJ_LAMPIRAN_WP": Array_Into_ArrayObject(formData.getAll("Lampiran_Wajib_Pajak_") as string[], ["Nama Wajib Pajak", "NPWP", "Alamat"]),
        "INT_PROSES": 0,
        "OBJ_ND_PERMOHONAN": "",
    }

    return CreateRK
}

async function ProcessForm_For_PinjamMobilState(
    STR_ID_KENDARAAN: string,
    STR_NAMA_KENDARAAN: string,
    STR_TGL: string[],
    STR_TEMPAT: string,
    STR_AGENDA: string

) {


    let MobilForm = new FormData()
    MobilForm.append("ID_MOBIL", STR_ID_KENDARAAN)
    MobilForm.append("NAMA_MOBIL", STR_NAMA_KENDARAAN)

    for (var i = 0; i < STR_TGL.length; i++) {
        MobilForm.append("TGL", STR_TGL[i]) // array
    }

    MobilForm.append("Chosen__TGL", STR_TGL.toString()) // array
    MobilForm.append("Lokasi Kegiatan", STR_TEMPAT)
    MobilForm.append("Tujuan Penggunaan", STR_AGENDA)

    console.log("MobilForm", MobilForm)
    let Hasil = await PinjamMobilState(MobilForm) as { [key: string]: boolean }

    console.log("Hasil", Hasil)

    if (Hasil['sebagian'] === true) {
        Object.assign(Hasil, { "ID_MOBIL": STR_ID_KENDARAAN, "TGL": STR_TGL })

        return Hasil
    } else {

        return Hasil
    }


}

interface OBJ_GROUP_MOBIL__INTER {
    "ID_MOBIL": string,
    "STR_NAMA_MOBIL": string,
    "DATE_MOBIL": string[]
}


function Kelompokan__Mobil(formData: FormData) {

    let OBJ_ID_PINJAMAN = DeleteKey_From_OBJ(JSON.parse(formData.get("DateTimePicker_State") as string), ['WAKTU', 'ANIMATED', 'ID_PINJAMAN'])
    let OBJ_GROUP_MOBIL: { [key: string]: OBJ_GROUP_MOBIL__INTER } = {}
    let Iterate__Val = Object.values(OBJ_ID_PINJAMAN)

    for (var i = 0; i < Iterate__Val.length; i++) {
        if (Iterate__Val[i].ID_MOBIL !== "") {
            if (!OBJ_GROUP_MOBIL[Iterate__Val[i].ID_MOBIL]) {
                Object.assign(
                    OBJ_GROUP_MOBIL,
                    {
                        [Iterate__Val[i].ID_MOBIL]: {
                            "ID_MOBIL": Iterate__Val[i].ID_MOBIL,
                            "STR_NAMA_MOBIL": Iterate__Val[i].STR_NAMA_MOBIL,
                            "DATE_MOBIL": [Object.keys(OBJ_ID_PINJAMAN)[i]]
                        }
                    }
                )
            } else {
                OBJ_GROUP_MOBIL[Iterate__Val[i].ID_MOBIL]['DATE_MOBIL'].push(Object.keys(OBJ_ID_PINJAMAN)[i])
            }
        }
    }
    return OBJ_GROUP_MOBIL
}

function CekTanggal(Tanggal: string[]) {
    let ArrayBedaHari = []
    let Status = "Terima"
    for (var i = 0; i < Tanggal.length; i++) {
        if (Tanggal[i + 1]) {
            let Tanggal_1 = new Date(Tanggal[i])
            let Tanggal_2 = new Date(Tanggal[i + 1])

            let BedaHari = Math.round((Tanggal_2.getTime() - Tanggal_1.getTime()) / (1000 * 3600 * 24));

            if (BedaHari > 1) {
                Status = "Tolak"
            }

            ArrayBedaHari.push(BedaHari)
        }
    }

    return Status
}


export default async function Action_Kirim_RencanaKerja(formData: FormData) {

    // let CreatePinjamMobil = await ProcessForm_For_PinjamMobilState(formData)
    // let Kelompok_Mobil = Kelompokan__Mobil(formData)


    // let CreateRK = await ProcessForm(formData)

    let Tanggal = CekTanggal(formData.getAll("TanggalRK") as string[])

    let ReturnData_ServerAction = {}

    if (Tanggal === "Terima") {

        let Kelompok_Mobil = Kelompokan__Mobil(formData)
        // suksessssssss
        for (var i = 0; i < Object.values(Kelompok_Mobil).length; i++) {
            let Data = Object.values(Kelompok_Mobil)[i]
            await ProcessForm_For_PinjamMobilState(
                Data['ID_MOBIL'],
                Data['STR_NAMA_MOBIL'],
                Data['DATE_MOBIL'],
                formData.get("Lokasi_Spesifik") as string,
                formData.get("Agenda") as string
            )
        }


        console.log("Kelompok_Mobil", Kelompok_Mobil)
    }
    else {
        console.log("Ditolak", Tanggal)
        return Tanggal
    }



}





