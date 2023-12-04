import { NextRequest, NextResponse } from 'next/server'
import { READ_UserBySessionRequest } from '../function/Session'

import { cookies } from 'next/headers'




export async function GET(request: NextRequest, response: NextResponse) {


    try {
        let DataPegawai = await READ_UserBySessionRequest(request)

        // console.log("READ_UserBySessionRequest", DataPegawai)
        return NextResponse.json(DataPegawai)

    } catch (error) {
        cookies().delete('session')
        return NextResponse.json({ "IP Sikka": "0" })

    }





}