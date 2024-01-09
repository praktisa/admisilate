
import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import ActionLogin from './Auth/components/ActionLogin/ActionLogin'
import { Login } from './Auth/action/AuthAction'
import GET_USER from './Auth/action/function/GET_USER'

const Noto = Noto_Sans({
  subsets: ["latin"],
  weight: ['400']
})

export const metadata: Metadata = {
  title: 'Atrium',
  description: 'Automasi Administrasi Subbagian Umum',
}

interface children {
  children: React.ReactNode

}


export default async function RootLayout({ children }: children) {

  let RolePegawai = await GET_USER()



  return (
    <html lang="en">
      <body className={Noto.className}>

        {
          RolePegawai['IP Sikka'] != "0"
            ?
            <>
              {children}
            </>
            :
            <>
              <ActionLogin ServerAction={Login} />
            </>
        }

      </body>
    </html>
  )
}
