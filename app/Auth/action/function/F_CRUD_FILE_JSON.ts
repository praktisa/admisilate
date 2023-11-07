import fs from 'fs';



export function CreateFileJSON(Directory: string, Data: string) {

    fs.writeFile(Directory, Data, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("DATA TERSIMPAN", Directory);
    });
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