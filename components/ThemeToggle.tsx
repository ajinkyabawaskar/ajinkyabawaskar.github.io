'use client'

import { useEffect, useState } from 'react'

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192A88,88,0,1,1,216,128,88.1,88.1,0,0,1,128,216ZM128,200a72,72,0,1,0,72-72,72,72,0,0,0-72,72Z"/>
    <path d="M128,16a8,8,0,0,1,8,8V48a8,8,0,0,1-16,0V24a8,8,0,0,1,8-8Zm0,224a8,8,0,0,1,8,8v16a8,8,0,0,1-16,0V248a8,8,0,0,1,8-8ZM48,128a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H56a8,8,0,0,1-8-8Zm192,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H248a8,8,0,0,1-8-8ZM92.69,45.31a8,8,0,0,1,11.32,0l9.19,9.19a8,8,0,0,1-11.32,11.31l-9.19-9.19a8,8,0,0,1,0-11.31ZM175.7,199.41a8,8,0,0,1,0,11.31l-9.19,9.19a8,8,0,0,1-11.32,0l-9.19-9.19a8,8,0,0,1,11.32-11.31ZM240,128a8,8,0,0,1-8-8v-16a8,8,0,0,1,16,0v16a8,8,0,0,1-8,8ZM19.31,92.69a8,8,0,0,1,0-11.31l9.19-9.19a8,8,0,0,1,11.32,0l9.19,9.19a8,8,0,0,1,0,11.31Z"/>
  </svg>
)

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M128,24a104,104,0,0,0-98.8,73.46,8,8,0,0,1-12.12-11.33A120,120,0,1,1,227.58,140a8,8,0,0,1-11.33-12.12A104,104,0,0,0,128,24Z"/>
  </svg>
)

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = saved ?? (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}