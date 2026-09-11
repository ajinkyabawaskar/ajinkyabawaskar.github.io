import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"

import { getAllPosts } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Variable",
  description:
    "A web log about programming, software, technology, life and my thoughts in general.",
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length
  return `${Math.max(1, Math.round(words / 220))} min`
}

export default function HomePage() {
  const posts = getAllPosts()
  const recentPosts = posts.slice(0, 7)
  const latestPost = posts[0]
  const totalPosts = posts.length

  const groupedByYear = recentPosts.reduce<Record<string, typeof recentPosts>>(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString()
      if (!acc[year]) acc[year] = []
      acc[year].push(post)
      return acc
    },
    {}
  )
  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a))
  const topics = [...new Set(posts.map((p) => p.category))]

  return (
    <div className="py-10 sm:py-14">
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="pb-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Est. 2020 · Pune
            </p>
            <h1
              id="hero-heading"
              className="mb-4 font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl"
            >
              Writing about{" "}
              <em className="font-normal italic text-muted-foreground">
                software
              </em>{" "}
              and the people who make it.
            </h1>
            <p className="mb-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Notes on programming, distributed systems, and learning in public
              by Ajinkya Bawaskar.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link
                  href={
                    latestPost
                      ? `/${latestPost.category.toLowerCase()}/${latestPost.slug}/`
                      : "/categories/"
                  }
                >
                  Read the latest
                  <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about/">About the author</Link>
              </Button>
            </div>
            <div className="mt-9 border-t pt-5">
              <p className="font-mono text-xs text-muted-foreground">
                {totalPosts} essays, {topics.length} topics, updated{" "}
                {latestPost
                  ? new Date(latestPost.date).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "recently"}
              </p>
            </div>
          </div>

          <Card className="p-0">
            <CardHeader className="border-b bg-muted/50 p-5">
              <CardDescription className="font-mono text-[11px] uppercase tracking-widest">
                The index
              </CardDescription>
              <CardTitle className="font-serif text-xl font-medium tracking-tight">
                Browse by topic
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <Badge key={topic} variant="secondary" asChild>
                    <Link href="/categories/">{topic}</Link>
                  </Badge>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {totalPosts} essays since 2020
                </span>
                <Button variant="link" size="sm" asChild className="h-auto p-0">
                  <Link href="/categories/">
                    Full archive
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Latest essay */}
      {latestPost && (
        <section aria-labelledby="featured-heading" className="py-12">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2
              id="featured-heading"
              className="font-serif text-2xl font-medium tracking-tight"
            >
              Latest essay
            </h2>
            <Button variant="link" size="sm" asChild className="h-auto p-0">
              <Link href="/categories/">Browse archive</Link>
            </Button>
          </div>

          <Link
            href={`/${latestPost.category.toLowerCase()}/${latestPost.slug}/`}
            className="block"
          >
            <Card className="p-0 transition-shadow hover:shadow-lg">
              <div className="flex flex-col justify-center p-7 sm:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{latestPost.category}</Badge>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {new Date(latestPost.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    / {estimateReadTime(latestPost.content)} read
                  </span>
                </div>
                <h3 className="mb-3 font-serif text-2xl font-medium leading-tight tracking-tight sm:text-3xl">
                  {latestPost.title}
                </h3>
                <p className="mb-5 line-clamp-3 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
                  {latestPost.content
                    .slice(0, 190)
                    .replace(/[#*`[\]]/g, "")
                    .trim()}
                  ...
                </p>
                <Button size="sm" className="self-start">
                  Continue reading
                  <ArrowRight />
                </Button>
              </div>
            </Card>
          </Link>
        </section>
      )}

      <Separator />

      {/* Recent essays */}
      <section aria-labelledby="recent-heading" className="py-12">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2
            id="recent-heading"
            className="font-serif text-2xl font-medium tracking-tight"
          >
            Recent essays
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {posts.length} total
          </span>
        </div>

        <div className="space-y-10">
          {years.map((year) => (
            <div key={year}>
              <div className="mb-2 flex items-center gap-3">
                <span className="border-l-2 border-foreground/30 pl-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {year}
                </span>
                <Separator className="flex-1" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {groupedByYear[year].length} essays
                </span>
              </div>
              <ul role="list" className="divide-y">
                {groupedByYear[year].map((post) => (
                  <li key={post.slug} role="listitem">
                    <Link
                      href={`/${post.category.toLowerCase()}/${post.slug}/`}
                      className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 rounded-md py-4 transition-colors hover:bg-muted/60 hover:px-3 sm:grid-cols-[110px_1fr_auto]"
                    >
                      <time
                        dateTime={post.date}
                        className="col-span-full font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70 sm:col-span-1"
                      >
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span className="min-w-0 font-serif text-lg leading-snug tracking-tight group-hover:underline group-hover:underline-offset-4">
                        {post.title}
                      </span>
                      <Badge variant="outline" className="justify-self-end">
                        {post.category}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {posts.length > 7 && (
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/categories/">
                View full archive
                <ArrowRight />
              </Link>
            </Button>
          </div>
        )}
      </section>

      <Separator />

      {/* Closing */}
      <section aria-labelledby="colophon-heading" className="py-12">
        <div className="mx-auto grid max-w-4xl items-start gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <div>
            <p className="mb-4 font-serif text-2xl italic leading-snug tracking-tight">
              Software is less about software and more about people.
            </p>
            <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
              This site has been my public notebook since 2020. I write to
              clarify my own thinking and to leave a trail for anyone on a
              similar path.
            </p>
          </div>
          <div className="border-l pl-6">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Explore
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <Button variant="link" asChild className="h-auto p-0 font-serif text-base">
                  <Link href="/categories/">Browse by category</Link>
                </Button>
                <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                  {topics.join(", ")}
                </span>
              </li>
              <li>
                <Button variant="link" asChild className="h-auto p-0 font-serif text-base">
                  <Link href="/about/">About the author</Link>
                </Button>
                <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                  Pune, Backend, Writing
                </span>
              </li>
              <li>
                <Button variant="link" asChild className="h-auto p-0 font-serif text-base">
                  <a href="/feed.xml">Subscribe via RSS</a>
                </Button>
                <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                  Stay updated
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-3">
          {[
            { k: "Essays", v: `${totalPosts} published` },
            { k: "Topics", v: topics.join(" · ") },
            { k: "Since", v: "2020, Pune" },
          ].map((s) => (
            <Card key={s.k}>
              <CardHeader className="p-5 pb-1">
                <CardDescription className="font-mono text-[11px] uppercase tracking-widest">
                  {s.k}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-1">
                <CardTitle className="font-serif text-base font-medium">
                  {s.v}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
