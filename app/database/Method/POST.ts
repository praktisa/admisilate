// import { cookies } from 'next/headers'
// apabila melakukan fetch pada layout dengan menggunakan cookie,
// lakukan pada layout /fetcher, jangan pada route api bakal undefined


// You're importing a component that needs next/headers. That only works in a Server Component but one of its parents is marked with "use client", so it's a Client Component.
// Learn more: https://nextjs.org/docs/getting-started/react-essentials

export default async function POST(
    URL: string,
    AUTH: boolean = false,
    AddOption: any = {}
) {

    // let isAuth = AUTH === true ? cookies().get('session')?.value : ""

    let DefaultOption = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `${"isAuth"}`
        }
        // next: { tags: [tagsData] },
        // body: JSON.stringify(BodyData)
    }

    let MergedOption = { ...DefaultOption, ...AddOption }

    try {

        const res: any = await fetch(URL, MergedOption)

        return res

    } catch (error: any) {
        throw new Error('GAGAL POST DATA PADA ' + URL, error)
    }


}
