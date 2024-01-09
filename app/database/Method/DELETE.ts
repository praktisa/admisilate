'use server'

export default async function DELETE(
    URL: string,
    AddOption: any = {},

) {


    let DefaultOption = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': `${process.env.API_KEY}`
        }

    }

    let MergedOption = { ...DefaultOption, ...AddOption }

    try {

        const res: any = await fetch(URL, MergedOption)
        console.log("(METHOD): DELETE", res)
        return res.json()

    } catch (error: any) {
        throw new Error('(METHOD): GAGAL DELETE DATA PADA ' + URL, error)
    }


}
