import { NextRequest, NextResponse } from 'next/server'
import { DELETE_DATA_PINJAM_MOBIL_BY_ID } from '@SchemaKD/schema_tb_kendaraan_status'
import { revalidateTag } from 'next/cache'




export async function DELETE(request: NextRequest, response: NextResponse) {


    const { searchParams } = new URL(request.url)
    const ID_PINJAM = searchParams.get('ID') as string
    const ID_MOBIL = searchParams.get('Mob') as string

    // console.log("OBJ_DATE DELETE", OBJ_DATE)
    try {
        let result = await DELETE_DATA_PINJAM_MOBIL_BY_ID(ID_PINJAM, ID_MOBIL)

        console.log("DELETE_DATA_PINJAM_MOBIL_BY_ID", result)

        revalidateTag(`${ID_MOBIL}`)
        revalidateTag('all_mobil')
        revalidateTag('AdminRiwayatKD')

        return NextResponse.json(result)

    } catch (error) {
        console.log("(ERROR ROUTES) DELETE_DATA_PINJAM_MOBIL_BY_ID", error)
    }


}