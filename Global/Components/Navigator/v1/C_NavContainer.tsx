'use client'
import React, { Fragment, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Structure from '../../CTA/Structure'
import Link from 'next/link'


import { Session } from '@/app/Auth/components/SessionContext/SessionContext'

interface LC_Inter {
  style?: string
  children: React.ReactNode
  href: string
  prefetch?: boolean
  activePath: string
}

interface Menu__inter {
  Menu: ObjectMenu[]
}

interface ObjectMenu {
  display: string,
  link: string
  role?: string
}

interface Provider__Value__inter {
  [key: string]: string
}


export default function C_NavContainer({ Menu }: Menu__inter) {

  let DataContext = useContext<Provider__Value__inter>(Session)


  // if (DataContext) {
  //   if (DataContext['UNIT ORGANISASI'] === "Subbagian Umum dan Kepatuhan Internal") {

  //   }
  // }


  function CustomLink({ href, prefetch = false, style = "contained", children, activePath }: LC_Inter) {

    let isActive = activePath.includes(href)
    return (
      <Link href={href} prefetch={prefetch} >
        <Structure style={style} isActive={isActive} >
          {children}
        </Structure>
      </Link>
    )
  }

  return (
    <>
      {
        Menu.map((men: any, i: number) => {

          if (Menu[i].role === DataContext['UNIT ORGANISASI']) {
            return (
              <Fragment key={i}>
                <CustomLink
                  href={men.link}
                  style='navigation'
                  activePath={usePathname()}
                  prefetch={true}
                >
                  {men.display}
                </CustomLink>
              </Fragment>
            )
          }

          if (Menu[i].role === undefined) {
            return (
              <Fragment key={i}>
                <CustomLink
                  href={men.link}
                  style='navigation'
                  activePath={usePathname()}
                  prefetch={true}
                >
                  {men.display}
                </CustomLink>
              </Fragment>
            )
          }

        })
      }

    </>
  )
}
