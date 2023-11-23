// import { cookies } from 'next/headers'

export default async function DELETE(
    URL: string,
    AUTH: boolean = false,
    AddOption: any = {},

) {

    // let isAuth = AUTH === true ? cookies().get('session')?.value : ""

    let DefaultOption = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `${"isAuth"}`
        }
        // next: { tags: [tagsData] },
    }

    let MergedOption = { ...DefaultOption, ...AddOption }

    try {

        const res: any = await fetch(URL, MergedOption)

        return res

    } catch (error: any) {
        throw new Error('(METHOD): GAGAL DELETE DATA PADA ' + URL, error)
    }


}
