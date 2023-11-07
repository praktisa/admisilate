'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CREATE_Session, DELETE_Session, READ_Session } from "./function/Session"
import { AmbilDataPegawaiDariJSONDirectory, MasaCookie, TokenNIP } from "./function/function"


export async function Login(formData: FormData) {

    // 1 Ambil NIP yang telah diinput
    let NIP9 = formData.get("NIP9") as string
    if (NIP9) {
        // 2 Cek apakah NIP9 yang diinput ada pada FILE JSON Pegawai
        let GetData = AmbilDataPegawaiDariJSONDirectory(NIP9)
        let Availability = Object.keys(GetData).length

        if (Availability > 0) {

            // 3 Jika ada, buat token terhadap NIP
            let Token_NIP = TokenNIP(NIP9)

            // 4 Cek Session
            let ApakahSudahLogin = await READ_Session(NIP9)

            if (ApakahSudahLogin >= 1) {
                // Hapus Session yang pernah dibuat berdasarkan NIP9
                await DELETE_Session(NIP9)
                // Buat Ulang Session berdasarkan NIP9
                await CREATE_Session(NIP9, Token_NIP)

            } else {
                // Buat Session berdasarkan NIP9
                await CREATE_Session(NIP9, Token_NIP)
            }

            // Buat Cookies Session
            cookies().set({
                name: 'session',
                value: Token_NIP,
                expires: MasaCookie("1 tahun"),
                path: '/',
            })

            redirect('/App')


        } else {
            // console.log("Tidak Ditemukan")
            redirect('/Auth?UserNotFound')
            // return { "Pesan": -1, "User": "Pegawai Tidak Ditemukan" }
        }
    }
}

export async function Logout() {
    cookies().delete("session")

    redirect('/Auth')
}