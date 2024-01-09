

export default async function POST(
    URL: string,
    AddOption: any = {}
) {



    let Option = {
        method: "POST",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': `${process.env.API_KEY}`
        }
    }

    let MergedOption = { ...Option, ...AddOption }

    // console.log("MergedOption", MergedOption)

    try {

        const res: any = await fetch(URL, MergedOption)

        return res

    } catch (error: any) {
        throw new Error('GAGAL POST DATA PADA ' + URL, error)
    }


}
