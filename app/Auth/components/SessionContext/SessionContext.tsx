'use client'
import React, { createContext } from 'react'


export const Session = createContext({});

interface Provider__Value__inter {
    [key: string]: string
}

export default function SessionContext({ children, value }: { children: React.ReactNode, value: Provider__Value__inter }) {
    return (
        <>
            <Session.Provider value={value}>
                {children}
            </Session.Provider>

        </>
    )
}
