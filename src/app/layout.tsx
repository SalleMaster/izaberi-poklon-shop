import type { Metadata } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/layout/header/navigation/Header'
import Footer from '@/components/layout/footer/Footer'
import { AuthProvider } from '@/lib/auth/components/AuthProvider'
import { getUserDetails } from '@/lib/user'

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
  title: 'Reci Seci Pokloni Shop',
  description: 'Originalnost koja se daruje',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userDetails = getUserDetails()

  return (
    <html lang='en'>
      <head>
        <Script
          src='https://umami.radovanovic.net/script.js'
          data-website-id={process.env.UMAMI_DATA_WEBSITE_ID}
          strategy='afterInteractive'
          defer
        />
        <Script
          id='crisp-script'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen group`}
      >
        <AuthProvider userDetails={userDetails}>
          <Header />
          <div className='container px-4 my-6 mx-auto'>{children}</div>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
