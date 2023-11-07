import React from 'react'
import M from '../Modals.module.css'

interface Inter__Modals {
    children: React.ReactNode
}

export default function Blur({ children }: Inter__Modals) {
    return (
        <div className={M['blur']} >
            {children}
        </div>
    )
}
