import React from 'react'
import ST from './StyledTable.module.css'

export default function StyledTable({ children }: { children: React.ReactNode }) {
    return (
        <div className={ST['layoutTable']}>{children}</div>
    )
}
