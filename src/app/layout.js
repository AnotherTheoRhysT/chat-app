import getPathname from '@/utils/server/getPathname'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chat App',
  description: 'For practicing websockets and NextJS',
}

export default function RootLayout({ children }) {
  const pathname = getPathname()
  if (pathname == '/chat') {
    var htmlStyle = {height: '100dvh'}
    var bodyStyle = {height: '100dvh', display: 'flex', flexDirection: 'column'}
  } else {
    var htmlStyle = {}
    var bodyStyle = {}
  }

  return (
    <html lang="en" style={htmlStyle}>
      <body className={inter.className} style={bodyStyle}>{children}</body>
    </html>
  )
}
