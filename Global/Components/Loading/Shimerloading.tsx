import React from 'react'
import SH from './Shimerloading.module.css'

export default function Shimerloading({ loop }: any) {
    return (
        <div className={`${SH['skeleton']} ${loop === 0 ? SH['infinite'] : SH['once']} `} ></div>
    )
}
