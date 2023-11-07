'use client'
import React, { Fragment } from 'react'
import { usePathname } from 'next/navigation'
import Structure from '../../CTA/Structure'
import Link from 'next/link'

interface LC_Inter {
  style?: string
  children: React.ReactNode
  href: string
  prefetch?: boolean
  activePath: string
}

export default function C_NavContainer() {

  let Menu: any = [
    {
      href: "Dashboard",
      display: "Dashboard"
    },
    {
      href: "Kepegawaian",
      display: "Kepegawaian"
    },
    {
      href: "KendaraanDinas",
      display: "Kendaraan Dinas"
    },
    {
      href: "BMN",
      display: "Barang Milik Negara"
    },
    {
      href: "Keuangan",
      display: "Keuangan"
    },
    {
      href: "Kepatuhan",
      display: "Kepatuhan"
    },
  ]


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

          return (
            <Fragment key={i}>
              <CustomLink
                href={`/App/${men.href}`}
                style='navigation'
                activePath={usePathname()}
                prefetch={true}
              >
                {men.display}
              </CustomLink>
            </Fragment>
          )
        })
      }

    </>
  )
}
