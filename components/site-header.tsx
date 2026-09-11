import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Variable Home"
          className="font-serif text-xl font-medium tracking-tight"
        >
          Variable
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-1"
        >
          <Button variant="ghost" size="sm" asChild>
            <Link href="/about/">About</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/categories/">Archive</Link>
          </Button>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
