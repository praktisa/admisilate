import React from 'react'
import L from './LabelArea.module.css'

interface Label__Inter {
    children: React.ReactNode
    htmlFor: string
    label: string
}

export default function LabelArea({ children, htmlFor, label }: Label__Inter) {
    return (
        <label className={L['label']} htmlFor={htmlFor} >
            {children}
            <span className={L['span']} > {label}</span>
        </label>
    )
}
