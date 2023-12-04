

export default async function FETCH_GET_ADMIN_RIWAYAT() {



    const URL = `http://localhost:3000/App/KendaraanDinas/Riwayat/Action/api/AdminGetRiwayat`

    let DefaultOption = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authentication': `isAuth`
        },
        // cache: "no-store",
        next: { tags: ["AdminRiwayatKD"] },


    }

    try {

        const res: any = await fetch(URL, DefaultOption)

        return res

    } catch (error: any) {
        throw new Error('GAGAL GET DATA PADA ' + URL, error)
    }




}