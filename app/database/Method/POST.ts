import { cookies } from 'next/headers'

export default async function POST(
    URL: string,
    AUTH: boolean = false,
    AddOption: any = {}
) {

    let isAuth = AUTH === true ? cookies().get('session')?.value : ""

    let DefaultOption = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `${isAuth}`
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
