import { READ_BLOB_IMG_BY_ID } from '@SchemaKD/schema_tb_kendaraan'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest, response: NextResponse) {


    const { searchParams } = new URL(request.url)
    const ID = searchParams.get('DK') as string
    let result = await READ_BLOB_IMG_BY_ID(ID)


    return NextResponse.json(result)







}