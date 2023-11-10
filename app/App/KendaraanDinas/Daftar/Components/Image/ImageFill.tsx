import React from 'react'
import Image from 'next/image'
import IF from './ImageFill.module.css'

interface ImageFill_inter {
    src: string
    animated: boolean
    hover: boolean
    quality: number
}

export default function ImageFill({ src, animated, hover, quality }: ImageFill_inter) {

    // ${ IF['IMG'] } 

    return (
        <>
            <Image
                src={`/KendaraanDinas/${src}.jpg`}
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
        </>
    )
}
