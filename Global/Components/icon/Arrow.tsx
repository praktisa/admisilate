import React from 'react'
import ARW from './Arrow.module.css'

export default function Arrow({ direction = "right" }: { direction: string }) {



    return (
        <span
            className={`${ARW['structure']} ${ARW[direction]}`}
        >
            &#x279C;
        </span>
    )
}
