'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { SiteConfig } from '@/lib/content'

export function Nav({ config }: { config: SiteConfig }) {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [taglineHidden, setTaglineHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      setDark(true)
      document.body.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setTaglineHidden(prev => prev ? window.scrollY > 20 : window.scrollY > 70)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setTaglineHidden(false)
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const handler = () => {
      setHeadings(window.__navHeadings ?? [])
    }
    window.addEventListener('nav-headings-updated', handler)
    handler()
    return () => window.removeEventListener('nav-headings-updated', handler)
  }, [])

  function toggleDark() {
    const next = !dark
    setDark(next)
    document.body.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const isEssayRoute = pathname?.startsWith('/essays/') && pathname !== '/essays'

  const navInnerStyle: React.CSSProperties =
    isEssayRoute
      ? { maxWidth: '880px', paddingLeft: 'calc(32px + 180px + 32px)', paddingRight: '32px' }
      : {}

  return (
    <>
      <nav className="site-nav">
        <div className="nav-inner" style={navInnerStyle}>
          <div className="nav-name-row">
            <Link href="/" className="nav-name">Steph Koch-Yang</Link>
            <div className="toggle-wrap" onClick={toggleDark}>
              <div className="toggle-track">
                <div className="toggle-thumb" />
              </div>
              <div className="toggle-labels">
                <span className={!dark ? 'on' : ''}>Light</span>
                <span>/</span>
                <span className={dark ? 'on' : ''}>Dark</span>
              </div>
            </div>
          </div>
          <div className="nav-links">
            <Link href="/essays" className={pathname?.startsWith('/essays') ? 'curr' : ''}>Essays</Link>
            <Link href="/tools" className={pathname?.startsWith('/tools') ? 'curr' : ''}>Tools</Link>
            <Link href="/about" className={pathname === '/about' ? 'curr' : ''}>About</Link>
            {isEssayRoute && headings.length > 0 && (
              <button
                className="mobile-contents-btn"
                onClick={() => setMobileOpen(o => !o)}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="1" y1="11" x2="9" y2="11" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                Contents
              </button>
            )}
          </div>
          <div className={`nav-tagline-wrap${taglineHidden ? ' hidden' : ''}`}>
            <div className="nav-tagline">{config.navTagline}</div>
          </div>
        </div>
        <div className="nav-rule" />
      </nav>

      {isEssayRoute && headings.length > 0 && (
        <div ref={panelRef} className={`mobile-contents-panel${mobileOpen ? ' open' : ''}`}>
          <Link href="/essays" className="mobile-back" onClick={() => setMobileOpen(false)}>
            ← Essays
          </Link>
          <div className="sidebar-label">Contents</div>
          {headings.map(h => (
            <div
              key={h.id}
              className="sidebar-item"
              onClick={() => {
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setMobileOpen(false)
              }}
            >
              {h.text}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
