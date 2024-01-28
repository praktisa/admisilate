import React from 'react'
import CI from './Custom_Interception.module.css'

interface Custom_Interception {
  children: React.ReactNode
}

export default function Custom_Interception({ children }: Custom_Interception) {
  return (
    <div className={CI['Interception']}>{children}</div>
  )
}
