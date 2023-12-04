
import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { cookies } from 'next/headers'
import SessionContext from './Auth/components/SessionContext/SessionContext'
import ActionLogin from './Auth/components/ActionLogin/ActionLogin'
import { redirect } from 'next/dist/server/api-utils'

const Noto = Noto_Sans({
  subsets: ["latin"],
  weight: ['400']
})

export const metadata: Metadata = {
  title: 'Admisi',
  description: 'Administrasi Kepegawaian Terotomasi',
}

interface children {
  children: React.ReactNode

}

async function RoleUser(auth: string) {
  // try {
  const res: any = await fetch(`http://localhost:3000/Auth/action/api/`, {
    method: "GET",
    credentials: 'same-origin',
    headers: {
      'Authentication': auth
    },
    // cache: "no-cache",
    next: { tags: [auth] }
  })


  if (!res.ok) {
    throw console.log("error")
  }

  return res.json()

}

interface RolePegawai__inter {
  [key: string]: string
}

export default async function RootLayout({ children }: children) {

  let SessionCookie = cookies().get("session")?.value as string
  let RolePegawai: RolePegawai__inter = {}

  if (SessionCookie != undefined) {
    RolePegawai = await RoleUser(SessionCookie)
  }


  return (
    <html lang="en">
      <body className={Noto.className}>

        {
          SessionCookie != undefined && RolePegawai['IP Sikka'] != "0"
            ?
            <SessionContext value={RolePegawai}>
              {children}
            </SessionContext>
            :
            <>
              <ActionLogin />
            </>
        }

      </body>
    </html>
  )
}
