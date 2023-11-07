export default async function getDataMobil(dk: string) {


    // try {
    const res: any = await fetch(`http://localhost:3000/App/KendaraanDinas/Action/api/GetDataMobil?DK=${dk}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            // 'Authentication': Auth(AUTH)
        },
        next: { tags: [dk] }
    }).then(res => {
        console.log("Success " + dk, res.json())
        return res.json()

    }).catch(err => {
        console.log("ERROR FETCH DATA MOBIL " + dk, err)
    })



    // } catch (error) {


    //     return error
    // }

}