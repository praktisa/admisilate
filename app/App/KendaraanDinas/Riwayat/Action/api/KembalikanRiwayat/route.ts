import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_UPDATE_CEK_DAN_UBAH_PINJAMAN_LAMA, DELETE_DATA_PINJAM_MOBIL_BY_ID } from '@SchemaKD/schema_tb_kendaraan_status'
import { revalidateTag } from 'next/cache'

import { ADMIN_UPDATE_KEMBALIKAN_REGISTER } from '@/app/App/KendaraanDinas/Daftar/@modal/(.)peminjaman/[dk]/Action/Register_CRUD'
import { redirect } from 'next/navigation'




export async function POST(request: NextRequest, response: NextResponse) {

    // let DataPegawai = await READ_SERVER_SESSION(["All"])

    const DATA = await request.json()

    // step 1 tb_kendaraandinas_status
    // akses ID_STATUS_LAMA DENGAN DATA.ID_STATUS_KEMBALI, apabila ada (Edit) apabila tidak (jangan dilanjutkan) edit dibagian ID_STATUS yang diambil alih menjadi 1
    let EndResult = await ADMIN_UPDATE_CEK_DAN_UBAH_PINJAMAN_LAMA(DATA.ID_STATUS_KEMBALI, DATA.TGL_KEMBALI).then(async (Data) => {

        // apabila sukses maka akan mengeluarkan nama seksi yang telah diubah
        if (Data['Peminjam_Sebelumnya'].length !== 0) {

            // kemudian nama seksi tersebut dimasukan kedalam register yang ingin dikembalikan
            await ADMIN_UPDATE_KEMBALIKAN_REGISTER(DATA.ID_REGISTER, DATA.ID_STATUS_KEMBALI, Data['Peminjam_Sebelumnya'])
                .then(async (hasil_update) => {
                    Object.assign(Data, { "Kembalikan": hasil_update })

                    // setelah dimasukan hapus tb_kendaraan_status berdasarkan ID_AMBIL_ALIH agar tidak mempengaruhi register
                    try {
                        await DELETE_DATA_PINJAM_MOBIL_BY_ID(DATA.ID_STATUS_HAPUS, DATA.ID_STATUS_HAPUS).then((hasil_hapus) => {
                            hasil_hapus === "Berhasil" ? Object.assign(Data, { "Hapus": 1 }) : Object.assign(Data, { "Hapus": 0 })
                        })

                    } catch (error) {
                        console.log("Error Delete Data Pinjam Mobil", error)
                        Object.assign(Data, { "Hapus": 0 })
                    }

                    revalidateTag(Data['Nama_Mobil'])
                    revalidateTag('all_mobil')
                    revalidateTag('AdminRiwayatKD')

                }).catch((error_kembali) => {
                    console.log("Error Mengembalikan Pinjam Mobil", error_kembali)
                    Object.assign(Data, { "Kembalikan": 0 })
                })
        }

        return Data
    })

    delete EndResult['Peminjam_Sebelumnya']
    delete EndResult['Nama_Mobil']




    console.log("EndResult EndResult EndResult ADMIN_UPDATE_CEK_DAN_UBAH_PINJAMAN_LAMA", EndResult)

    return NextResponse.json(EndResult["Hapus"])

}