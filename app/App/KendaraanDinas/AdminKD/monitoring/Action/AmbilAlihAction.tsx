'use server'

export async function Action_Ambil_Alih(formData: FormData) {

    // let ValueAdd = await DataProcessing(formData)
    let ID_REGISTER = formData.get("ID_REGISTER") as string
    let ID_STATUS = formData.get("ID_STATUS") as string
    let TGL = formData.get("TGL") as string

    console.log("Action_Ambil_Alih", ID_REGISTER, ID_STATUS, TGL)

}



