import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/Nav'
import { getSiteConfig } from '@/lib/content'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Steph Koch-Yang',
  description: 'Notes on running organisations, building in fintech, and what AI actually changes for operators.',
  manifest: '/manifest.json',
  themeColor: '#faf9f7',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Steph Koch-Yang',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getSiteConfig()
  return (
    <html lang="en">
      <body>
        <Nav config={config} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
