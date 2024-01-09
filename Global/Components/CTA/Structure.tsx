import React from 'react'
import B from './Button.module.css'

interface BD_Inter {
    style?: any
    children: React.ReactNode
    onClick?: any
    isActive?: boolean
}

interface ContainerIcon__inter {

    children: React.ReactNode

}

export default function Structure({ children, onClick, style = "contained", isActive }: BD_Inter) {

    let styleList: any = {
        "contained": B['styleContained'],
        "containedCenter": B['styleContainedCenter'],
        "outlined": B['styleOutlined'],
        "navigation": B['styleNav'],
        "text": B['styleText'],
        "danger": B['styleDanger'],
        "dangerHover": B['styleDangerHover'],
        "success": B['styleSuccess']

    }

    return (
        <>
            <div
                className={`
                ${B['Structure']} 
                ${isActive === true ? B['styleContained'] : styleList[style]}
            `}

            >
                {children}
            </div>
        </>

    )
}

export function Icon({ children }: ContainerIcon__inter) {

    return (
        <>
            <div className={B['ContainerIcon__container']}>
                <div className={B['ContainerIcon__position']}>
                    {children}
                </div>
            </div>


        </>
    )
}

