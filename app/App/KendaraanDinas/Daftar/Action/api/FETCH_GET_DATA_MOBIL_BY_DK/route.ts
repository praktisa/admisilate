import { CEK_UserBySessionRequest } from '@/app/Auth/action/function/Session'
import { ADMIN_READ_KENDARAAN_DINAS_BY_ID } from '@SchemaKD/schema_tb_kendaraan'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest, response: NextResponse) {


    await CEK_UserBySessionRequest(request)


    const { searchParams } = new URL(request.url)
    const ID = searchParams.get('DK') as string
    let result = await ADMIN_READ_KENDARAAN_DINAS_BY_ID(ID)


    return NextResponse.json(result)







}