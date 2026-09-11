"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

import { Separator } from "@/components/ui/separator"

interface UtterancesProps {
  slug: string
}

export default function Utterances({ slug }: UtterancesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ""

    const utterancesTheme =
      resolvedTheme === "dark" ? "github-dark" : "github-light"

    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.crossOrigin = "anonymous"
    script.setAttribute(
      "repo",
      "ajinkyabawaskar/ajinkyabawaskar.github.io"
    )
    script.setAttribute("issue-term", "pathname")
    script.setAttribute("theme", utterancesTheme)
    script.setAttribute("label", "comment")

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [slug, resolvedTheme])

  return (
    <div className="mt-16 space-y-6">
      <Separator />
      <div ref={containerRef} className="utterances min-h-28" />
    </div>
  )
}
