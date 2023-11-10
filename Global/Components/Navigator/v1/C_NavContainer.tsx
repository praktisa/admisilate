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
      display: "Dashboard",
      link: "/App/Dashoard"
    },
    {
      href: "Kepegawaian",
      display: "Kepegawaian",
      link: "/App/Kepegawaian"
    },
    {
      href: "KendaraanDinas",
      display: "Kendaraan Dinas",
      link: "/App/KendaraanDinas"
    },
    {
      href: "BMN",
      display: "Barang Milik Negara",
      link: "/App/Dashoard"
    },
    {
      href: "Keuangan",
      display: "Keuangan",
      link: "/App/Dashoard"
    },
    {
      href: "Kepatuhan",
      display: "Kepatuhan",
      link: "/App/Dashoard"
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
                href={men.link}
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
