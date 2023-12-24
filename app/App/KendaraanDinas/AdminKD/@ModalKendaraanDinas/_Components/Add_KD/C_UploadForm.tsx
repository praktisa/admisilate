'use client'
import React from 'react'
import { useState } from "react";
import CUF from './C_UploadForm.module.css'
import ImageFill from '@/app/App/KendaraanDinas/Daftar/Components/Image/ImageFill';

interface ImgtoBuffer__inter {
    type: string
    data: Uint8Array
}

interface C_UploadForm__inter {
    CurrentData?: ImgtoBuffer__inter
}

export default function C_UploadForm({ CurrentData }: C_UploadForm__inter) {

    const [ImgtoBuffer, setImgtoBuffer] = useState<ImgtoBuffer__inter>(
        !CurrentData
            ?
            { type: "Buffer", data: new Uint8Array(0) }
            :
            CurrentData.data.length === 0 ? { type: "Buffer", data: new Uint8Array(0) } : CurrentData
    )


    async function PreviewUploadImg(e: any) {


        let imgFile = e.target.files[0] as File

        if (imgFile != undefined) {
            // console.log("imgFile imgFile", imgFile)

            const bytes = await imgFile.arrayBuffer()
            const buf = Buffer.from(bytes)

            let ParsedBuf = JSON.parse(JSON.stringify(buf))

            setImgtoBuffer(ParsedBuf)
        }

    }

    function CancelImg() {
        console.log("ImgtoBuffer", ImgtoBuffer.data.length)
        setImgtoBuffer({ type: "Buffer", data: new Uint8Array(0) })
    }

    return (
        <>
            {
                ImgtoBuffer.data.byteLength != 0
                    ?
                    <>
                        <div className={CUF['cancel']} onClick={() => CancelImg()} >
                            {/* &#x2715;  */}
                            &#8646; Ganti
                        </div>

                        <ImageFill src={ImgtoBuffer} animated={false} hover={true} quality={100} />
                    </>
                    :
                    <div className={CUF['empty']} >
                        <h2>Upload Gambar 📷</h2>
                    </div>

            }


            <input
                input-type="hidden"
                type="file"
                name="BLOB_IMG"
                id="BLOB_IMG"
                accept='image/jpeg, image/png, image/jpg'

                onChange={(e: any) => PreviewUploadImg(e)}
            />
        </>
    )
}
