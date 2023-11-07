
export default function KlasifikasiSeksiPegawai(datapegawai: any) {
    let Jabatan = datapegawai['Jabatan']
    let UNIT = datapegawai[`UNIT ORGANISASI`]


    // console.log("UNIT", Jabatan, UNIT, datapegawai)

    if (Jabatan.includes('Pemeriksa Pajak')) {
        return "Fungsional Pemeriksa"
    } else if (Jabatan.includes('Penyuluh')) {
        return "Fungsional Penyuluh"
    } else if (Jabatan.includes('Penyidik')) {
        return "Penyidik"
    } else {
        return UNIT
    }

}