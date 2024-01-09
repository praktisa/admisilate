'use server'
import 'server-only'


import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CREATE_SESSION, DELETE_Session, READ_SESSION_BY_NIP } from "./function/Session"
import { AmbilDataPegawaiDariJSONDirectory, MasaCookie, OAT, PublicTokenNIP } from "./function/function"


export async function Login(formData: FormData) {

    // 1 Ambil NIP yang telah diinput
    let NIP9 = formData.get("NIP9") as string

    if (NIP9.length === 9) {
        // 2 Cek apakah NIP9 yang diinput ada pada FILE JSON Pegawai
        let GetData = AmbilDataPegawaiDariJSONDirectory(NIP9)
        let Availability = Object.keys(GetData).length

        if (Availability > 0) {
            // 3 Jika ada, buat token terhadap NIP
            let Token_NIP = PublicTokenNIP(NIP9) as string

            // 4 Cek Session
            let ApakahSudahLogin = await READ_SESSION_BY_NIP(NIP9)

            console.log("ApakahSudahLogin", ApakahSudahLogin)

            let QuerySession = {
                "STR_Session": Token_NIP,
                "STR_NIP9": NIP9,
                "STR_IP": ""
            }

            if (ApakahSudahLogin >= 1) {
                console.log("SUDAHHHHHH Login")
                // Hapus Session yang pernah dibuat berdasarkan NIP9
                await DELETE_Session(NIP9)
                // Buat Ulang Session berdasarkan NIP9
                await CREATE_SESSION(QuerySession)

            } else {
                console.log("Belum Login")
                // Buat Session berdasarkan NIP9
                await CREATE_SESSION(QuerySession)
            }


            // Buat Cookies Session
            cookies().set({
                name: 'session',
                value: Token_NIP,
                expires: MasaCookie("1 tahun"),
                path: '/',
                sameSite: "strict"
            })

            // await FETCH_POST_SESSION_USER_TO_MIDDLEWARE(Token_NIP)

            // redirect('/App')

            return { "status": 1, "user": GetData['NAMA PEGAWAI'], "load": true }

        } else {
            console.log("Tidak Ditemukan")

            return { "status": -1, "user": "Pegawai Tidak Ditemukan", "load": false }
        }
    } else {
        return { "status": -1, "user": "NIP kurang dari 9 karekter", "load": false }
    }
}

export async function Logout() {
    cookies().delete("session")

    redirect('/Auth')
}