'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { SiteConfig } from '@/lib/content'

export function Nav({ config }: { config: SiteConfig }) {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      setDark(true)
      document.body.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
      meta.setAttribute('content', dark ? '#303030' : '#f2f1ee')
    })
  }, [dark])

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setScrollProgress(0)
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
  const isToolRoute = pathname?.startsWith('/tools/') && pathname !== '/tools'
  const showProgress = isEssayRoute || isToolRoute

  const navInnerStyle: React.CSSProperties =
    isEssayRoute
      ? { maxWidth: '880px', paddingLeft: 'calc(32px + 180px + 32px)', paddingRight: '32px' }
      : {}

  return (
    <>
      <nav className="site-nav">
        <div className="nav-inner" style={navInnerStyle}>
          <div className="nav-left">
            <Link href="/" className="nav-name">Steph Koch-Yang</Link>
            <div className="nav-links">
              <Link href="/essays" className={pathname?.startsWith('/essays') ? 'curr' : ''}>Essays</Link>
              <Link href="/tools" className={pathname?.startsWith('/tools') ? 'curr' : ''}>Tools</Link>
              <Link href="/about" className={pathname === '/about' ? 'curr' : ''}>About</Link>
              {isEssayRoute && headings.length > 0 && (
                <button
                  className="mobile-contents-btn"
                  onClick={() => setMobileOpen(o => !o)}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.3" />
                    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.3" />
                    <line x1="1" y1="11" x2="9" y2="11" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="toggle-wrap" onClick={toggleDark}>
            <svg className={`toggle-icon${!dark ? ' active' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <line x1="12" y1="2" x2="12" y2="6"/>
              <line x1="12" y1="18" x2="12" y2="22"/>
              <line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/>
              <line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/>
              <line x1="2" y1="12" x2="6" y2="12"/>
              <line x1="18" y1="12" x2="22" y2="12"/>
              <line x1="4.22" y1="19.78" x2="7.05" y2="16.95"/>
              <line x1="16.95" y1="7.05" x2="19.78" y2="4.22"/>
            </svg>
            <div className="toggle-track">
              <div className="toggle-thumb" />
            </div>
            <svg className={`toggle-icon${dark ? ' active' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </div>
        </div>
        <div className="nav-rule" />
        {showProgress && (
          <div className="read-progress" style={{ width: `${scrollProgress}%` }} />
        )}
      </nav>

      {isEssayRoute && headings.length > 0 && (
        <div ref={panelRef} className={`mobile-contents-panel${mobileOpen ? ' open' : ''}`}>
          <button className="mobile-contents-close" onClick={() => setMobileOpen(false)} aria-label="Close">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="1" y1="1" x2="9" y2="9" />
              <line x1="9" y1="1" x2="1" y2="9" />
            </svg>
          </button>
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
