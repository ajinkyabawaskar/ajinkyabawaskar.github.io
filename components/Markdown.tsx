"use client"

import { Children, isValidElement } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import Mermaid from "@/components/Mermaid"

function MermaidPre({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  node,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & { node?: unknown }) {
  const child = Children.toArray(children)[0]
  if (
    isValidElement(child) &&
    typeof (child.props as { className?: string })?.className === "string" &&
    (child.props as { className?: string }).className!.includes(
      "language-mermaid"
    )
  ) {
    const code = (child.props as { children?: React.ReactNode }).children
    const chart = String(code ?? "").replace(/\n$/, "")
    return <Mermaid chart={chart} />
  }
  return <pre {...props}>{children}</pre>
}

function TableWrapper({
  children,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto my-8 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="min-w-max">
        <table {...props}>{children}</table>
      </div>
    </div>
  )
}

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        pre: MermaidPre,
        table: TableWrapper,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
