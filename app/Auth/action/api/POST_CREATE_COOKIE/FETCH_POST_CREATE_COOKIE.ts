import 'server-only'
import POST from '@Method/POST';

export default async function FETCH_POST_CREATE_COOKIE(Cookie: string) {

    const URL = `http://localhost:3000/Auth/action/api/POST_CREATE_COOKIE`

    try {
        let Response = await POST(URL, { body: JSON.stringify({ "Cookie": Cookie }) })
        return Response
    } catch (error) {
        console.log("FETCH_POST_CREATE_COOKIE ERROR", error)
    }





}