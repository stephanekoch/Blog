import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Nav } from '@/components/Nav'
import { getSiteConfig } from '@/lib/content'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Steph Koch-Yang',
  description: 'Notes on how AI is changing the way modern companies build and scale.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Steph Koch-Yang',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f1ee' },
    { media: '(prefers-color-scheme: dark)', color: '#303030' },
  ],
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
