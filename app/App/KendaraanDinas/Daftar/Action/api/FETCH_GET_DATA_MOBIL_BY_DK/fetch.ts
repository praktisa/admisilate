import GET from "@Method/GET";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function FETCH_GET_DATA_MOBIL_BY_DK(dk: string) {

    const URL = `http://localhost:3000/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_DATA_MOBIL_BY_DK?DK=${dk}`

    let FetchTag = { next: { tags: [dk] } }


    let session = cookies().get('session')?.value as string
    let Response = await GET(URL, session, FetchTag)

    if (Response !== 0) {
        console.log("FETCH_GET_DATA_MOBIL_BY_DK FETCH", Response)
        return Response
    }

    redirect('/App/KendaraanDinas/AdminKD')


}

// pada saat mobil dihapus, situs tidak kembali ke /App/KendaraanDinas/AdminKD/ namun tetap mmenuju situs mobil yang telah dihapus