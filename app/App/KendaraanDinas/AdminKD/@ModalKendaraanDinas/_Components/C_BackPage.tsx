'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function C_BackPage({ children }: { children: React.ReactNode }) {

    const Router = useRouter()


    return (
        <>
            <span onClick={() => Router.back()}>
                {children}
            </span>
        </>
    )
}
