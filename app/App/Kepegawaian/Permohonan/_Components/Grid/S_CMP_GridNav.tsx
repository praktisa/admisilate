import React from 'react'
import GN from './S_CMP_GridNav.module.css'

export default function S_CMP_GridNav({ children }: { children: React.ReactNode }) {
  return (
    <div className={GN['Container']} >
      <div className={GN['Container__Grid']}>
        {children}
      </div>
    </div>
  )
}
