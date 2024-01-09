
import DELETE from "@Method/DELETE";

export default async function FETCH_DELETE_ID_PINJAM(ID_PINJAM: any, ID_MOBIL: string) {

    const QUERY_URL = `?ID=${ID_PINJAM}&Mob=${ID_MOBIL}`
    const URL = `http://localhost:3000/App/KendaraanDinas/Riwayat/Action/api/HapusRiwayat${QUERY_URL}`

    let FetchTag = {
        next: { tags: ['all_mobil', ID_MOBIL] }
    }

    let Response = await DELETE(URL, FetchTag)


    // console.log("FETCH_DELETE_ID_PINJAM", Response)

    return Response


}