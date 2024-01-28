import React from 'react'
import LN from './LayoutNavigation.module.css'
import C_NavContainer from '@/Global/Components/Navigator/v1/C_NavContainer'


interface LayoutNavigation_inter {
    children: React.ReactNode
    role: any,
    Menu: any
}

export default async function LayoutNavigation({ children, role, Menu }: LayoutNavigation_inter) {




    return (
        <>
            <div className={LN['Layout']}>
                <div className={LN['Layout__Nav']}>
                    <C_NavContainer Menu={Menu} role={role} />
                </div>

                <div className={LN['Layout__Content']}>
                    {children}
                </div>
            </div>
        </>
    )
}

