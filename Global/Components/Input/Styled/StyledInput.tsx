import React from 'react'
import In from '../Input.module.css'

interface StyledInput__inter {
    children: React.ReactNode,
    label: string
}

export default function StyledInput({ children, label }: StyledInput__inter) {


    return (
        <>
            <label className={In['label']} htmlFor="basic">
                {children}
                <span className={In['span']} >{label}</span>
            </label>
        </>
    )
}
