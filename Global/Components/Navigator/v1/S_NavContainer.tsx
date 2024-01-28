import React from 'react'
import NC from './NavContainer.module.css'


interface children {
  children: React.ReactNode
  logout: React.ReactNode
}

export default function S_NavContainer({ children, logout }: children) {
  return (
    <>
      <div className={NC['layout']}>

        <span className={NC['layout__logo']}>
          <h1>Atrium</h1>
        </span>

        <span className={NC['layout__menu']}>
          {children}
        </span >

        <span className={NC['layout__footer']}>
          {logout}
        </span>

      </div>
    </>
  )
}
