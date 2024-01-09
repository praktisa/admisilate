'use server'
import { NextRequest, NextResponse } from 'next/server'
import { MasaCookie } from '../../function/function'
import { cookies } from 'next/headers'



export async function POST(request: NextRequest, response: NextResponse) {

    const { Cookie } = await request.json()

    console.log("POST COOKIE", Cookie)

    cookies().set({
        name: 'session',
        value: JSON.stringify(Cookie),
        expires: MasaCookie("1 tahun"),
        path: '/',
        // sameSite: "strict"
    })

    return NextResponse.json("ok")


}