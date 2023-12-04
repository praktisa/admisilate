import { redirect } from "next/navigation"


export default async function FETCH_POST_KEMBALIKAN_RIWAYAT(ID_REGISTER: string, ID_STATUS_KEMBALI: string, TGL_KEMBALI: string, ID_STATUS_HAPUS: string) {

    let BodyData = {
        "ID_REGISTER": ID_REGISTER,
        "ID_STATUS_KEMBALI": ID_STATUS_KEMBALI,
        "TGL_KEMBALI": TGL_KEMBALI,
        "ID_STATUS_HAPUS": ID_STATUS_HAPUS
    }


    const URL = `http://localhost:3000/App/KendaraanDinas/Riwayat/Action/api/KembalikanRiwayat`

    let DefaultOption = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `isAuth`
        },
        // next: { tags: [tagsData] },
        body: JSON.stringify(BodyData)
    }

    try {

        const res: any = await fetch(URL, DefaultOption)


        return res

    } catch (error: any) {
        throw new Error('GAGAL POST DATA PADA ' + URL, error)
    }




}