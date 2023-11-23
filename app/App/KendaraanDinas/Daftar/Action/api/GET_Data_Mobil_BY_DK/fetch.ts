import GET from "@Method/GET";

export default async function GET_DATA_MOBIL_BY_DK(dk: string) {

    const URL = `http://localhost:3000/App/KendaraanDinas/Action/api/GetDataMobil?DK=${dk}`

    let FetchTag = { next: { tags: [dk] } }

    let Response = await GET(URL, true, FetchTag)

    return Response
}