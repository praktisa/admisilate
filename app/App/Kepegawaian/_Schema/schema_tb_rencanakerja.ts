import { Execute_Kepegawaian } from './executor_Kepegawaian';



const Table: string = 'tb_rencanakerja'



export async function CREATE_KENDARAAN_DINAS(Object_Data: any) {


    let QUERY = {
        "TABLE": Table,
        "METHOD": "INSERT",
        "DATA": Object_Data
    }

    let hasil = await Execute_Kepegawaian(QUERY)

    return hasil
}
