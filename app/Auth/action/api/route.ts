import { NextRequest, NextResponse } from 'next/server'
import { READ_UserBySession } from '../function/Session'
// import { READ_KENDARAAN_DINAS_BY_ID } from '../../CRUD/DaftarKD_CRUD'




export async function GET(request: NextRequest, response: NextResponse) {

    // const { searchParams } = new URL(request.url)
    // const ID = searchParams.get('DK') as string

    // let result = await READ_KENDARAAN_DINAS_BY_ID(ID)

    // console.log("request AUTH", request.headers)

    let DataPegawai = await READ_UserBySession(request)


    return NextResponse.json(DataPegawai)

}