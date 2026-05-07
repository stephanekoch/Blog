'use client'

import { useEffect } from 'react'

interface NavUpdaterProps {
  headings: { id: string; text: string }[]
  isEssayPage?: boolean
}

export function NavUpdater({ headings, isEssayPage }: NavUpdaterProps) {
  useEffect(() => {
    window.__navHeadings = headings
    window.__isEssayPage = isEssayPage ?? false
    window.dispatchEvent(new CustomEvent('nav-headings-updated'))
  }, [headings, isEssayPage])

  return null
}

declare global {
  interface Window {
    __navHeadings?: { id: string; text: string }[]
    __isEssayPage?: boolean
  }
}
