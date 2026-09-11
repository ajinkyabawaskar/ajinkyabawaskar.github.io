import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"

import { getAllPosts, getAllCategories } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Archive",
  description: "Browse all essays by category.",
}

export default function CategoriesPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const postsByCategory = categories.reduce(
    (acc, cat) => {
      acc[cat] = posts.filter(
        (p) => p.category.toLowerCase() === cat.toLowerCase()
      )
      return acc
    },
    {} as Record<string, typeof posts>
  )

  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Archive
          </p>
          <h1 className="mb-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            Archive
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            {posts.length} essays across {categories.length} categories.
            Chronological index, no algorithm.
          </p>
        </header>

        <Separator className="mb-8" />

        {categories.length === 0 ? (
          <Card>
            <CardHeader>
              <CardDescription>No essays yet.</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-10">
            {categories.map((category) => {
              const catPosts = postsByCategory[category] || []
              return (
                <section key={category} aria-label={`${category} essays`}>
                  <Card className="overflow-hidden p-0">
                    <CardHeader className="flex flex-row items-baseline justify-between gap-4 space-y-0 border-b bg-muted/50 p-5">
                      <CardTitle className="font-serif text-xl font-medium tracking-tight">
                        {category}
                      </CardTitle>
                      <Badge variant="secondary">
                        {catPosts.length} essays
                      </Badge>
                    </CardHeader>
                    <ul role="list" className="divide-y">
                      {catPosts.map((post) => (
                        <li key={post.slug} role="listitem">
                          <Link
                            href={`/${post.category.toLowerCase()}/${post.slug}/`}
                            className="group flex items-baseline justify-between gap-4 p-5 transition-colors hover:bg-muted/60"
                          >
                            <div className="min-w-0">
                              <span className="block font-serif text-lg leading-snug tracking-tight group-hover:underline group-hover:underline-offset-4">
                                {post.title}
                              </span>
                              <time
                                dateTime={post.date}
                                className="mt-1 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                              >
                                {new Date(post.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </time>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                              Read
                              <ArrowRight className="h-3 w-3" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </section>
              )
            })}
          </div>
        )}

        <Separator className="my-8" />
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <a href="/feed.xml">Subscribe via RSS</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
