import React from 'react'
import B from './Button.module.css'

interface BD_Inter {
    style?: any
    children: React.ReactNode
    onClick?: any
    isActive?: boolean
}

export default function C_Structure({ children, onClick, style = "contained", isActive }: BD_Inter) {

    let styleList: any = {
        "contained": B['styleContained'],
        "outlined": B['styleOutlined'],
        "navigation": B['styleNav'],
        "text": B['styleText'],
        "danger": B['styleDanger'],
        "success": B['styleSuccess']
    }

    return (
        <>
            <div
                className={`
                ${B['Structure']} 
                ${isActive === true ? B['styleContained'] : styleList[style]}
            `}
                onClick={onClick}
            >
                {children}
            </div>
        </>

    )
}


