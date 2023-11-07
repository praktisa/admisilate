


export default async function CekTabel(Connection: any, Tabel: string) {

    let QuerySelect = `SELECT COUNT(*) FROM ${Tabel}`

    let Status: any = await Connection.promise().query(QuerySelect);

    return Status
}