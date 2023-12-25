import 'server-only'
import GET from "@Method/GET";



export default async function GET_ALL_DataMobil() {

    const URL = `http://localhost:3000/App/KendaraanDinas/Daftar/Action/api/GET_ALL_DataMobil`


    let FetchTag = { next: { tags: ['all_mobil'] } }

    let Response = await GET(URL, FetchTag)

    return Response


}