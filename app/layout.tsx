import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

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

export default function RootLayout({ children }: children) {

  return (
    <html lang="en">
      <body className={Noto.className}>
        {children}
      </body>
    </html>
  )
}
