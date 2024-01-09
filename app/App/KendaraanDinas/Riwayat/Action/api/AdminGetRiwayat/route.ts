import { ADMIN_READ_ALL_REGISTER } from '@SchemaKD/schema_tb_kendaraan_register'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest, response: NextResponse) {

    let DATA_SEMUA = await ADMIN_READ_ALL_REGISTER(">=")


    console.log("ADMIN_READ_ALL_REGISTER ADMIN_READ_ALL_REGISTER", DATA_SEMUA)
    return NextResponse.json(DATA_SEMUA)

}