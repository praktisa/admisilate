import fs from 'fs';
// import express from 'express'



export function CreateFileJSON(Directory: string, Data: string) {

    const jsn = JSON.stringify(Data);
    const blob = new Blob([jsn], { type: 'application/json' });
    const file = new File([blob], Directory);

    console.log("file", file)

    if (process.getuid) {
        console.log(`Current uid: ${process.getuid()}`);
    }


    // fs.writeFile(Directory, Data, 'utf8', function (err) {
    //     if (err) {
    //         console.log("CREATE JSON GAGAL");
    //         return console.log(err);
    //     }

    //     console.log("DATA TERSIMPAN", Directory);
    // });
}

export function ReadFileJSON(Directory: string) {
    let DataPegawai: string

    if (fs.existsSync(Directory)) {
        DataPegawai = fs.readFileSync(Directory, 'utf-8')
    } else {
        DataPegawai = "tidak ada"
    }

    return DataPegawai
}