import type { Metadata } from 'next'
import Script from 'next/script'
// import { SessionProvider } from 'next-auth/react'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/layout/header/navigation/Header'
import Footer from '@/components/layout/footer/Footer'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Izaberi Poklon Shop',
  description: 'Originalnost koja se daruje',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <Script
          src='https://umami.radovanovic.net/script.js'
          data-website-id={process.env.UMAMI_DATA_WEBSITE_ID}
          strategy='afterInteractive'
          defer
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen group`}
      >
        {/* <SessionProvider> */}
        <Header />
        <div className='container px-4 my-6 mx-auto'>{children}</div>
        <Footer />
        <Toaster />
        {/* </SessionProvider> */}
      </body>
    </html>
  )
}
