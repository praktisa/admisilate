import { NextRequest, NextResponse } from 'next/server'
import { DELETE_DATA_PINJAM_MOBIL_BY_ID } from '../../Riwayat_CRUD'
import { revalidateTag } from 'next/cache'




export async function DELETE(request: NextRequest, response: NextResponse) {


    const { searchParams } = new URL(request.url)
    const ID_PINJAM = searchParams.get('ID') as string
    const ID_MOBIL = searchParams.get('Mob') as string

    // console.log("OBJ_DATE DELETE", OBJ_DATE)

    await DELETE_DATA_PINJAM_MOBIL_BY_ID(ID_PINJAM, ID_MOBIL)

    revalidateTag(`${ID_MOBIL}`)
    revalidateTag('all_mobil')

    return NextResponse.json("result")

}