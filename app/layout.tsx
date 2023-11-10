
import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { cookies } from 'next/headers'
import SessionContext from './Auth/components/SessionContext/SessionContext'

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
    // cache: "no-cache"
    next: { tags: [auth] }
  })


  if (!res.ok) {
    throw console.log("eror")
  }

  return res.json()

}

export default async function RootLayout({ children }: children) {

  let SessionCookie = cookies().get("session")?.value as string

  // console.log("SessionCookie from root layout", SessionCookie)

  let RolePegawai = await RoleUser(SessionCookie)

  console.log("RolePegawai", RolePegawai)


  return (
    <html lang="en">
      <body className={Noto.className}>
        <SessionContext value={RolePegawai}>
          {children}
        </SessionContext>
      </body>
    </html>
  )
}
