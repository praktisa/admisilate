

export default async function GET(
    URL: string,
    OPT: object = {}
) {



    let Option = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': `${process.env.API_KEY}`
        }
    }

    if (Object.keys(OPT).length != 0) {
        Object.assign(Option, OPT)
    }

    try {
        const res: any = await fetch(URL, Option)

        return res.json()

    } catch (error: any) {
        throw new Error('GAGAL GET DATA PADA ' + URL, error)
    }


}
