import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/Nav'
import { getSiteConfig } from '@/lib/content'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Steph Koch-Yang',
  description: 'Notes on running organisations, building in fintech, and what AI actually changes for operators.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getSiteConfig()
  return (
    <html lang="en">
      <body>
        <Nav config={config} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
