import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function NotFound() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-xl text-center">
        <Badge variant="secondary" className="mb-4">
          404 / Not found
        </Badge>
        <h1 className="mb-4 font-serif text-7xl font-medium leading-none tracking-tight sm:text-8xl">
          Lost page
        </h1>
        <p className="mx-auto mb-7 max-w-md leading-relaxed text-muted-foreground">
          The transmission you are looking for does not exist or has been
          moved.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link href="/">Return home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/categories/">Browse archive</Link>
          </Button>
        </div>
        <Separator className="mx-auto my-8 max-w-xs" />
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Try the archive or use your browser back button.
        </p>
      </div>
    </div>
  )
}
