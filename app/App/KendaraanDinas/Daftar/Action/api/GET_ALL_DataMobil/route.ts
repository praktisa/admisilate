import { NextRequest, NextResponse } from 'next/server'
import { READ_SEMUA_KENDARAAN_DINAS } from '../../CRUD/DaftarKD_CRUD'




export async function GET(request: NextRequest, response: NextResponse) {

    // console.log("request READ_SEMUA_KENDARAAN_DINAS", request)

    let result = await READ_SEMUA_KENDARAAN_DINAS()

    // console.log("READ_SEMUA_KENDARAAN_DINAS result", result, request)


    return NextResponse.json(result)

}