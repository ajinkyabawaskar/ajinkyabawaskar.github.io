'use client'

import { useEffect, useRef } from 'react'

interface UtterancesProps {
  slug: string
}

export default function Utterances({ slug }: UtterancesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('repo', 'ajinkyabawaskar/ajinkyabawaskar.github.io')
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('theme', 'github-light')
    script.setAttribute('label', 'comment')

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [slug])

  return <div ref={containerRef} />
}