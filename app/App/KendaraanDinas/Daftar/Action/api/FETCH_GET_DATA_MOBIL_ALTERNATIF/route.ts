import { READ_REGISTER_FOR_ALTERNATE_KENDARAAN_DINAS_AVAILABILITY } from '@SchemaKD/schema_tb_kendaraan_register'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest, response: NextResponse) {


    const { searchParams } = new URL(request.url)
    const ArrayDate = searchParams.get('ArrayDate') as string
    let result = await READ_REGISTER_FOR_ALTERNATE_KENDARAAN_DINAS_AVAILABILITY(ArrayDate)


    return NextResponse.json(result)

}