import { redirect } from "next/navigation"



export default async function FETCH_POST_AMBIL_ALIH_RIWAYAT(ID_REGISTER: string, ID_STATUS: string, TGL_AMBIL: string) {

    let BodyData = {
        "ID_REGISTER": ID_REGISTER,
        "ID_STATUS": ID_STATUS,
        "TGL_AMBIL": TGL_AMBIL
    }


    const URL = `http://localhost:3000/App/KendaraanDinas/Riwayat/Action/api/AmbilAlihRiwayat`

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