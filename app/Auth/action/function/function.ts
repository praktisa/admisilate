import { createHash } from 'node:crypto';
import { ReadFileJSON } from './F_CRUD_FILE_JSON';

export function AmbilDataPegawaiDariJSON(DataPegawai: any, NIP: string) {
    let JSON_DataPegawai = JSON.parse(DataPegawai)

    let Result: any = {}
    for (var i = 0; i < JSON_DataPegawai.length; i++) {
        let NIP_DataPegawai = JSON_DataPegawai[i]['IP Sikka'].replaceAll("'", "")
        if (NIP_DataPegawai === NIP) {
            Result = JSON_DataPegawai[i]
        }
    }
    return Result
}

export function AmbilDataPegawaiDariJSONDirectory(NIP: string) {
    let DataPegawai: string = ReadFileJSON(`${process.env.DIRECTORY}`)
    let Result = AmbilDataPegawaiDariJSON(DataPegawai, NIP)

    return Result
}


export function PublicTokenNIP(NIP: string) {
    let RandomNumber = Math.floor(Math.random() * 100)
    let MD5NIP = md5(NIP + RandomNumber)

    return MD5NIP
}

// OnAppToken
export function OAT(NIP_TOKENIZE: string) {
    let Result = md5(NIP_TOKENIZE)
    return Result
}


export default function md5(content: string, algo = 'md5') {
    const hashFunc = createHash(algo);   // you can also sha256, sha512 etc
    hashFunc.update(content);
    return hashFunc.digest('hex');       // will return hash, formatted to HEX
}


export function MasaCookie(String: string = "1 tahun") {
    let CurrentDate = new Date()

    let StringArray = String.split(" ")

    let NewDate

    if (StringArray[1] === "tahun") {
        NewDate = new Date(CurrentDate.setFullYear(CurrentDate.getFullYear() + parseInt(StringArray[0])))
    }

    if (StringArray[1] === "bulan") {
        NewDate = new Date(CurrentDate.setMonth(CurrentDate.getMonth() + parseInt(StringArray[0])))
    }

    if (StringArray[1] === "hari") {
        NewDate = new Date(CurrentDate.setDate(CurrentDate.getDate() + parseInt(StringArray[0])))
    }

    return NewDate
}