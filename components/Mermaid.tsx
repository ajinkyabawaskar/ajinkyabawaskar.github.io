"use client"

import { useEffect, useId, useState } from "react"
import { useTheme } from "next-themes"

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const rawId = useId()
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`
  const { resolvedTheme } = useTheme()
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function render() {
      setError(false)
      setSvg(null)
      try {
        // Dynamic import keeps the mermaid runtime out of the initial
        // page bundle — it loads only on pages that contain a diagram.
        const mermaid = (await import("mermaid")).default
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "default",
          securityLevel: "loose",
          fontFamily:
            "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
        })
        // Validate syntax first for a cleaner error fallback
        await mermaid.parse(chart)
        const { svg } = await mermaid.render(id, chart)
        if (!cancelled) setSvg(svg)
      } catch {
        if (!cancelled) setError(true)
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [chart, id, resolvedTheme])

  if (error) {
    return (
      <figure className="my-8">
        <pre>
          <code className="language-mermaid">{chart}</code>
        </pre>
        <figcaption className="mt-2 text-center font-mono text-xs text-muted-foreground">
          Could not render diagram — showing source.
        </figcaption>
      </figure>
    )
  }

  if (!svg) {
    // SSR / loading fallback: show source so no-JS still sees content
    return (
      <pre aria-busy="true" aria-label="Loading diagram">
        <code className="language-mermaid">{chart}</code>
      </pre>
    )
  }

  return (
    <div
      className="mermaid-diagram my-8 flex justify-center overflow-x-auto"
      role="img"
      aria-label="Mermaid diagram"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
