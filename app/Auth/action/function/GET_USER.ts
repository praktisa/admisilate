'use server'
import 'server-only'
import { cookies } from "next/headers"
import FETCH_GET_SESSION_USER from "../api/GET_SESSION_USER/FETCH_GET_SESSION_USER"

interface GET_USER__inter {
    [key: string]: string
}

export default async function GET_USER() {
    let SessionCookie = cookies().get("session")?.value as string
    let User: GET_USER__inter = JSON.parse(await FETCH_GET_SESSION_USER(SessionCookie) as string)
    return User
}
