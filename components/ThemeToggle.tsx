'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = saved ?? (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  if (!mounted) {
    return <button className="theme-toggle" aria-hidden="true">[THEME]</button>
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'light' ? 'SWITCH TO DARK MODE' : 'SWITCH TO LIGHT MODE'}
      title={theme === 'light' ? 'SWITCH TO DARK MODE' : 'SWITCH TO LIGHT MODE'}
    >
      {theme === 'light' ? '[ DARK ]' : '[ LIGHT ]'}
    </button>
  )
}