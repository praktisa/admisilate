import React from 'react'
import In from '../Input.module.css'

interface StyledInput__inter {
    children: React.ReactNode,
    label: string,
    forId: string,
    withBorder?: boolean
}

export default function StyledInput({ children, label, forId, withBorder = false, }: StyledInput__inter) {


    return (
        <>
            <label className={`${In['label']} ${withBorder === true && In['with__border']}`} htmlFor={forId}>
                {children}
                <span className={In['span']} >{label}</span>
            </label>
        </>
    )
}
