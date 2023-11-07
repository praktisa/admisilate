import React from 'react'
import L from './Label.module.css'

interface Label__Inter {
    children: React.ReactNode
    htmlFor: string
    label: string
}

export default function Label({ children, htmlFor, label }: Label__Inter) {
    return (
        <label className={L['label']} htmlFor={htmlFor} >
            {children}
            <span className={L['span']} > {label}</span>
        </label>
    )
}
