import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Mail } from "lucide-react"

import { GithubIcon, LinkedinIcon } from "@/components/icons"

import { getPage } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ajinkya Bawaskar, software engineer, writer, and the author of Variable.",
}

export default function AboutPage() {
  const page = getPage("about")

  if (!page)
    return (
      <div className="py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          About page not found
        </p>
      </div>
    )

  return (
    <div className="py-10">
      <header className="mx-auto mb-8 max-w-3xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          About
        </p>
        <h1 className="mb-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Ajinkya Bawaskar
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Senior Associate at JPMorganChase based in Mumbai. I build
          Derivatives & FX Settlement systems and write to think clearly.
        </p>
      </header>

      <Separator className="mx-auto mb-8 max-w-3xl" />

      <div className="mx-auto max-w-3xl">
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.6fr] lg:gap-10">
          <aside className="lg:sticky lg:top-20">
            <Card className="overflow-hidden p-0">
              <Image
                src="/img/profile.png"
                alt="Ajinkya Bawaskar"
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
                priority
              />
              <CardHeader className="border-t p-5">
                <CardTitle className="font-serif text-lg font-medium">
                  Ajinkya Bawaskar
                </CardTitle>
                <CardDescription className="font-mono text-xs normal-case tracking-normal">
                  Java, Spring Boot, Kafka, Kubernetes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 p-5 pt-0">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com/ajinkyabawaskar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://linkedin.com/in/ajinkyabawaskar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:ajinkyabawaskar2@gmail.com">
                    <Mail />
                    Email
                  </a>
                </Button>
                <dl className="mt-3 grid gap-2 border-t pt-4">
                  {[
                    ["Location", "Mumbai, India"],
                    ["Writing since", "2020"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between gap-2"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        {k}
                      </dt>
                      <dd className="font-mono text-[11px]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </aside>

          <div>
            <div className="prose-blog">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {page.content}
              </ReactMarkdown>
            </div>

            <Separator className="my-8" />

            <section aria-labelledby="connect-heading">
              <h2
                id="connect-heading"
                className="mb-4 font-serif text-xl font-medium tracking-tight"
              >
                Keep reading
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { k: "Archive", v: "Browse essays", href: "/categories/" },
                  {
                    k: "Code",
                    v: "GitHub",
                    href: "https://github.com/ajinkyabawaskar",
                  },
                  { k: "Subscribe", v: "RSS feed", href: "/feed.xml" },
                ].map((item) => (
                  <Card key={item.k} className="transition-shadow hover:shadow-md">
                    <CardHeader className="p-4">
                      <CardDescription className="font-mono text-[11px] uppercase tracking-widest">
                        {item.k}
                      </CardDescription>
                      <CardTitle className="font-serif text-[15px] font-medium">
                        {item.href.startsWith("http") ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.v}
                          </a>
                        ) : (
                          <Link href={item.href}>{item.v}</Link>
                        )}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            <Card className="mt-8 bg-muted/50">
              <CardHeader className="p-5 pb-2">
                <CardDescription className="font-mono text-[11px] uppercase tracking-widest">
                  Currently exploring
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 p-5 pt-1">
                {[
                  "Java",
                  "Spring Boot",
                  "Kafka",
                  "Kubernetes",
                  "Distributed systems",
                  "GenAI Agents",
                ].map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <section className="mt-8">
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Colophon
              </h3>
              <dl className="grid gap-1.5 text-[13px]">
                {[
                  ["Engine", "Next.js 15, React 19"],
                  ["UI", "shadcn, Tailwind v4, IBM Plex"],
                  ["Content", "Markdown, Gray Matter"],
                  ["Hosting", "GitHub Pages, static export"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <dt className="min-w-28 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {k}
                    </dt>
                    <dd className="text-muted-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
