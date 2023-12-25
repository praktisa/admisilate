import 'server-only'
import GET from "@Method/GET";

export default async function FETCH_GET_IMG() {

    const URL = `http://localhost:3000/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_IMG`


    let FetchTag = { cache: 'no-store' }

    let Response = await GET(URL, FetchTag)

    return Response


}