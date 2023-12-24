import GET from "@Method/GET";
import { cookies } from "next/headers";

export default async function GET_ALL_DataMobil() {

    const URL = `http://localhost:3000/App/KendaraanDinas/Daftar/Action/api/GET_ALL_DataMobil`



    let FetchTag = { next: { tags: ['all_mobil'] } }

    let session = cookies().get('session')?.value as string
    let Response = await GET(URL, session, FetchTag)

    return Response


}