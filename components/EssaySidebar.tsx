'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface EssaySidebarProps {
  headings: { id: string; text: string }[]
}

export function EssaySidebar({ headings }: EssaySidebarProps) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      let current = 0
      headings.forEach((h, i) => {
        const el = document.getElementById(h.id)
        if (el && el.getBoundingClientRect().top < 140) current = i
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [headings])

  return (
    <div className="essay-sidebar">
      <Link href="/essays" className="sidebar-back-fixed">← Essays</Link>
      <div className="sidebar-contents">
        <div className="sidebar-label">Contents</div>
        {headings.map((h, i) => (
          <div
            key={h.id}
            className={`sidebar-item${active === i ? ' active' : ''}`}
            onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            {h.text}
          </div>
        ))}
      </div>
    </div>
  )
}
