'use server'
import { NextRequest, NextResponse } from 'next/server'
import { READ_UserBySessionRequest } from '../../function/Session'




export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url)
    const SessionCookie = searchParams.get('SessionCookie') as string


    try {

        let DataPegawai = await READ_UserBySessionRequest(SessionCookie) as any

        return NextResponse.json(DataPegawai)



    } catch (error) {
        // cookies().delete('session')
        console.log("SessionCookie", error)
        return NextResponse.json({ "IP Sikka": "0" })

    }





}