import { ADMIN_READ_ALL_REGISTER } from '@/app/App/KendaraanDinas/_Schema/schema_tb_kendaraan_register'
import { NextRequest, NextResponse } from 'next/server'




export async function GET(request: NextRequest, response: NextResponse) {

    const { searchParams } = new URL(request.url)
    const Comparison = searchParams.get('Comparison') as string

    try {
        let result = await ADMIN_READ_ALL_REGISTER(Comparison)
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json(error)
    }

}