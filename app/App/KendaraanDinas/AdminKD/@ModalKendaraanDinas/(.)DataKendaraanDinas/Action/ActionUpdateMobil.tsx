'use server'

import { ADMIN_UPDATE_KENDARAAN_DINAS_BY_ID } from "@SchemaKD/schema_tb_kendaraan"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function ActionUpdateMobil(formData: FormData) {

    async function readImageFile(file: File) {
        const bytes = await file.arrayBuffer()
        const buf = Buffer.from(bytes)

        console.log(" readImageFile file", file)
        console.log(" readImageFile Buffer", JSON.stringify(buf))

        return buf
    }

    let EditValue = {
        ID_LAMA: formData.get("ID_LAMA") as string,
        STR_PLAT: formData.get("STR_PLAT") as string,
        ID: (formData.get("STR_PLAT") as string).replaceAll(" ", ""),
        STR_NAMA: formData.get("STR_NAMA") as string,
        BLOB_IMG: formData.get("BLOB_IMG") as File,
        STR_JENIS: formData.get("STR_JENIS") as string
    }

    let DataImg = await readImageFile(EditValue.BLOB_IMG)

    Object.assign(EditValue, { BLOB_IMG: DataImg })

    let EditResult = JSON.parse(JSON.stringify(await ADMIN_UPDATE_KENDARAAN_DINAS_BY_ID(EditValue)))

    revalidateTag("all_mobil")

    console.log("EditResult ", EditResult)

    let ReturnedData = !EditResult.message ? JSON.stringify(EditResult[0].changedRows) : EditResult.message

    if (ReturnedData.includes("Duplicate")) {
        return "Duplicate"

    } else if (ReturnedData.includes("0")) {
        return "Gagal"

    } else if (ReturnedData.includes("1")) {

        return "Berhasil"
    }




}



