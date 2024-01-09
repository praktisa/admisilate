import DELETE from "@Method/DELETE";

export default async function FETCH_DELETE_ID_MOBIL(ID_MOBIL: string) {

    const QUERY_URL = `?ID=${ID_MOBIL}`
    const URL = `http://localhost:3000/App/KendaraanDinas/AdminKD/DataKendaraanDinas/api/HapusMobil${QUERY_URL}`

    let FetchTag = {
        // next: { tags: ['all_mobil'] }
    }

    let Response = await DELETE(URL, FetchTag)




    return Response


}