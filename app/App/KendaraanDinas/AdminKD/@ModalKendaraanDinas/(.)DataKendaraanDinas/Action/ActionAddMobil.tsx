'use server'

import { CREATE_KENDARAAN_DINAS } from "@SchemaKD/schema_tb_kendaraan"
import { revalidateTag } from "next/cache"


export async function ActionAddMobil(formData: FormData) {

    async function readImageFile(file: File) {
        const bytes = await file.arrayBuffer()
        const buf = Buffer.from(bytes)
        return buf
    }

    let AddValue = {
        STR_PLAT: formData.get("STR_PLAT") as string,
        ID: (formData.get("STR_PLAT") as string).replaceAll(" ", ""),
        STR_NAMA: formData.get("STR_NAMA") as string,
        BLOB_IMG: formData.get("BLOB_IMG") as File,
        STR_JENIS: formData.get("STR_JENIS") as string
    }

    let DataImg = await readImageFile(AddValue.BLOB_IMG)

    Object.assign(AddValue, { BLOB_IMG: DataImg })

    // console.log("BLOB ActionAddMobil", DataImg)


    try {
        let Result = JSON.stringify(await CREATE_KENDARAAN_DINAS(AddValue))
        revalidateTag("all_mobil")
        console.log("BERHASIL CREATE_KENDARAAN_DINAS", Result)

        return Result

    } catch (error) {
        console.log("Error CREATE_KENDARAAN_DINAS", error)
    }





    // console.log("ActionAddMobil", Result)

    // redirect('/App/KendaraanDinas/AdminKD')
}



