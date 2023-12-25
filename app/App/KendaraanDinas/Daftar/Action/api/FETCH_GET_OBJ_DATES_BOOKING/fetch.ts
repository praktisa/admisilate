import 'server-only'
import GET from "@Method/GET";

export default async function FETCH_GET_OBJ_DATES_BOOKING() {


    const URL = `http://localhost:3000/App/KendaraanDinas/Daftar/Action/api/FETCH_GET_OBJ_DATES_BOOKING`


    let FetchTag = { next: { tags: ['all_obj_dates'] } }

    let Response = await GET(URL, FetchTag)

    return Response


}