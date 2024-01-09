
import 'server-only'
import POST from '@Method/POST'

export default async function FETCH_POST_SESSION_USER_TO_MIDDLEWARE(Session_Token: string) {

    const URL = `http://localhost:3000/Auth/action/api/POST_SESSION_USER_TO_MIDDLEWARE`


    let Option = {
        method: "POST",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': `${process.env.API_KEY}`,
            'Authorization': Session_Token
        }
    }


    let Response = await POST(URL, Option)

    console.log("RESPONSE FETCH_POST_SESSION_USER_TO_MIDDLEWARE", Response)

    return Response


}