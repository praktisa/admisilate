import { NextRequest, NextResponse } from 'next/server'
import { READ_SEMUA_KENDARAAN_DINAS } from '../../CRUD/DaftarKD_CRUD'
import { CEK_UserBySessionRequest } from '@/app/Auth/action/function/Session'




export async function GET(request: NextRequest, response: NextResponse) {

    let isLogin = await CEK_UserBySessionRequest(request)

    if (isLogin === 1) {
        let result = await READ_SEMUA_KENDARAAN_DINAS()
        return NextResponse.json(result)

    } else {
        return NextResponse.json("Unauthorized")
    }




}