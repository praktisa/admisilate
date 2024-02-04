import 'server-only'
import GET from "@Method/GET";



export default async function FETCH_ADMIN_READ_ALL_REGISTER(Comparison: string) {

    const URL = `http://localhost:3000/App/KendaraanDinas/AdminKD/monitoring/Action/api/FETCH_ADMIN_READ_ALL_REGISTER?Comparison=${Comparison}`


    let FetchTag = { cache: "no-store" }

    let Response = await GET(URL, FetchTag)

    return Response


}