import { NextRequest, NextResponse } from 'next/server'

import { revalidateTag } from 'next/cache'
import { DELETE_KENDARAAN_DINAS_BY_ID } from '@SchemaKD/schema_tb_kendaraan'




export async function DELETE(request: NextRequest, response: NextResponse) {


    const { searchParams } = new URL(request.url)
    const ID_MOBIL = searchParams.get('ID') as string


    let result = await DELETE_KENDARAAN_DINAS_BY_ID(ID_MOBIL)


    revalidateTag('all_mobil')

    console.log("DELETE_KENDARAAN_DINAS_BY_ID", result)

    return NextResponse.json(result)

}