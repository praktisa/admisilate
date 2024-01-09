import 'server-only'
import GET from "@Method/GET";

export default async function FETCH_GET_SESSION_USER(SessionCookie: string) {


    let URL = ""
    if (SessionCookie !== undefined) {
        URL = `http://localhost:3000/Auth/action/api/GET_SESSION_USER?SessionCookie=${SessionCookie}`
    } else {
        URL = `http://localhost:3000/Auth/action/api/GET_SESSION_USER?SessionCookie=0`
    }

    // console.log("URL", URL)


    let FetchTag = { next: { tags: [`${SessionCookie}`] } }

    try {
        let Response = await GET(URL, FetchTag)


        return JSON.stringify(Response)


    } catch (error) {
        console.log("FETCH_GET_SESSION_USER ERROR", error)
    }


    // console.log("Response FETCH_GET_SESSION_USER", Response)




}