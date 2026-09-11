import Link from "next/link"
import { Rss } from "lucide-react"

import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const SOCIALS = [
  {
    href: "https://github.com/ajinkyabawaskar",
    label: "GitHub",
    Icon: GithubIcon,
  },
  {
    href: "https://instagram.com/ajinkyabawaskar",
    label: "Instagram",
    Icon: InstagramIcon,
  },
  {
    href: "https://linkedin.com/in/ajinkyabawaskar",
    label: "LinkedIn",
    Icon: LinkedinIcon,
  },
  { href: "/feed.xml", label: "RSS", Icon: Rss },
]

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-2">
            <Link
              href="/"
              aria-label="Variable Home"
              className="font-serif text-xl font-medium tracking-tight"
            >
              Variable
            </Link>
            <p className="font-mono text-xs leading-relaxed text-muted-foreground">
              A web log about programming, software, technology, life and my
              thoughts in general. Written and coded by Ajinkya Bawaskar since
              2020.
            </p>
          </div>
          <nav aria-label="Social links" className="flex flex-wrap gap-1">
            {SOCIALS.map(({ href, label, Icon }) => (
              <Button key={label} variant="ghost" size="sm" asChild>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={label}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </a>
              </Button>
            ))}
          </nav>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Ajinkya Bawaskar</span>
          <span>Next.js 15 / shadcn / IBM Plex</span>
        </div>
      </div>
    </footer>
  )
}
