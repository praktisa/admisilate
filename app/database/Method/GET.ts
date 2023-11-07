import { cookies } from 'next/headers'
// apabila melakukan fetch pada layout dengan menggunakan cookie,
// lakukan pada layout /fetcher, jangan pada route api bakal undefined


export default async function GET(
    URL: string,
    AUTH: boolean = false
) {

    let isAuth = AUTH === true ? cookies().get('session')?.value : ""

    try {
        const res: any = await fetch(URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `${isAuth}`

            },
        })

        return res.json()

    } catch (error: any) {
        throw new Error('GAGAL GET DATA PADA ' + URL, error)
    }


}
