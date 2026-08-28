'use client'

import { useEffect, useRef, useState } from 'react'

interface UtterancesProps {
  slug: string
}

export default function Utterances({ slug }: UtterancesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<'github-light' | 'github-dark'>('github-light')

  useEffect(() => {
    if (!containerRef.current) return

    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const currentTheme = saved ?? (prefersDark ? 'dark' : 'light')
    setTheme(currentTheme === 'dark' ? 'github-dark' : 'github-light')

    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('repo', 'ajinkyabawaskar/ajinkyabawaskar.github.io')
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('theme', currentTheme === 'dark' ? 'github-dark' : 'github-light')
    script.setAttribute('label', 'comment')

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [slug])

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const currentTheme = saved ?? (prefersDark ? 'dark' : 'light')
    setTheme(currentTheme === 'dark' ? 'github-dark' : 'github-light')
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const iframe = containerRef.current.querySelector('iframe')
    if (iframe) {
      iframe.style.border = '1px solid var(--color-border)'
      iframe.style.backgroundColor = 'var(--color-canvas)'
      iframe.style.borderRadius = 'var(--radius-md)'
    }
  }, [theme])

  return (
    <div ref={containerRef} className="utterances" style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--color-border)' }} />
  )
}