'use server'

import { cookies } from 'next/headers'
import { MasaCookie } from './function/function'



export async function CreateCookies(SessionValue: string) {

    console.log("Membuat Session Baru ", SessionValue)

    cookies().set({
        name: 'session',
        value: SessionValue,
        expires: MasaCookie("1 tahun"),
        path: '/',
        sameSite: "strict"
    })

}
