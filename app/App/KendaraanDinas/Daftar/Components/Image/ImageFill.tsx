import React from 'react'
import Image from 'next/image'
import IF from './ImageFill.module.css'

interface ImageFill_inter {
    src: any
    animated: boolean
    hover: boolean
    quality: number
    ifNull?: string
}

export default function ImageFill({ src = null, animated, hover, quality, ifNull = "📷" }: ImageFill_inter) {

    // ${ IF['IMG'] } 

    function CatchBlob(src: any) {

        // console.log("CatchBlob", typeof src, src)

        if (src.type === "Buffer") {
            let ResultUTF64 = ""
            let NewBuffer = Buffer.from(src)
            ResultUTF64 = `data:image/jpg;base64, ${NewBuffer.toString('base64')}`

            return ResultUTF64
        } else {
            return "Not Buffer"
        }

    }

    return (
        <>
            {
                src != null

                    ?
                    <Image
                        // src={`/KendaraanDinas/${src}.jpg`}
                        src={CatchBlob(src)}
                        fill
                        className={`
                    
                    ${animated === true ? IF['animated'] : null}
                    ${hover === true ? IF['IMG_HOVER'] : IF['IMG']}
                `}
                        alt={src}
                        quality={quality}
                        // priority
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'

                        loading='lazy'
                        placeholder='blur'
                        blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
                    />
                    :
                    <div className={IF['IMG__NULL']} >
                        {ifNull}
                    </div>
            }

        </>
    )
}
