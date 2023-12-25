import { NextRequest, NextResponse } from 'next/server'
import { READ_SEMUA_OBJ_DATES_BOOKING } from '@SchemaKD/schema_tb_kendaraan'





export async function GET(request: NextRequest, response: NextResponse) {

    let Head = request.headers

    console.log("REQUEST READ_SEMUA_OBJ_DATES_BOOKING ZZZZZZZZZZZZZZ", Head)


    try {
        let result = await READ_SEMUA_OBJ_DATES_BOOKING()

        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json(error)
    }

}