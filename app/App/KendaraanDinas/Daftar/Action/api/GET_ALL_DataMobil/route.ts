import { NextRequest, NextResponse } from 'next/server'
import { READ_SEMUA_KENDARAAN_DINAS } from '@SchemaKD/schema_tb_kendaraan'



export async function GET(request: NextRequest, response: NextResponse) {


    try {
        let result = await READ_SEMUA_KENDARAAN_DINAS()

        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json(error)
    }

}