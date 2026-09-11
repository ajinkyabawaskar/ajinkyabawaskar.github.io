import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { getPostBySlug, getAllPosts } from "@/lib/posts"
import Utterances from "@/components/Utterances"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    category: post.category.toLowerCase(),
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.category, resolvedParams.slug)
  if (!post) return { title: "Post Not Found" }

  return {
    title: post.title,
    description: post.content.slice(0, 160).replace(/[#*`[\]]/g, ""),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160).replace(/[#*`[\]]/g, ""),
      type: "article",
      publishedTime: post.date,
      authors: ["Ajinkya Bawaskar"],
    },
  }
}

function preprocessMarkdown(content: string): string {
  return content
    .replace(/!\[([^\]]*)\]\(\/assets\/img\/([^)]+)\?style=centerme\)/g, "![$1](/img/$2)")
    .replace(/!\[([^\]]*)\]\(\/assets\/img\/([^)]+)\)/g, "![$1](/img/$2)")
    .replace(/\?style=centerme/g, "")
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length
  return `${Math.max(1, Math.round(words / 220))} min`
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.category, resolvedParams.slug)

  if (!post) notFound()

  const processedContent = preprocessMarkdown(post.content)
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const readTime = estimateReadTime(post.content)

  const allPosts = getAllPosts()
  const idx = allPosts.findIndex(
    (p) =>
      p.slug === resolvedParams.slug &&
      p.category.toLowerCase() === resolvedParams.category.toLowerCase()
  )
  const nextPost = idx > 0 ? allPosts[idx - 1] : null
  const prevPost =
    idx >= 0 && idx < allPosts.length - 1 ? allPosts[idx + 1] : null

  return (
    <article aria-labelledby="post-title" className="py-10">
      <div className="mx-auto max-w-3xl">
        <header className="pb-8">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" asChild>
              <Link href={`/${resolvedParams.category.toLowerCase()}/`}>
                {resolvedParams.category}
              </Link>
            </Badge>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {formattedDate} / {readTime}
            </span>
          </div>
          <h1
            id="post-title"
            className="mb-6 font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl"
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="px-0">
              <Link href="/">
                <ArrowLeft />
                Back to index
              </Link>
            </Button>
            <span aria-hidden="true" className="text-border">
              /
            </span>
            <Button variant="link" size="sm" asChild className="h-auto p-0">
              <Link href="/about/">About the author</Link>
            </Button>
          </div>
        </header>

        <Separator className="mb-8" />

        <div className="prose-blog">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {processedContent}
          </ReactMarkdown>
        </div>

        <Separator className="my-10" />

        <nav aria-label="Post navigation" className="grid gap-3 md:grid-cols-2">
          {prevPost ? (
            <Button
              variant="outline"
              asChild
              className="h-auto justify-start p-0"
            >
              <Link
                href={`/${prevPost.category.toLowerCase()}/${prevPost.slug}/`}
                className="block w-full"
              >
                <Card className="w-full border-0 shadow-none">
                  <CardHeader className="p-5 text-left">
                    <CardDescription className="font-mono text-[11px] uppercase tracking-widest">
                      Previous
                    </CardDescription>
                    <CardTitle className="font-serif text-base font-medium leading-snug">
                      {prevPost.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </Button>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Button
              variant="outline"
              asChild
              className="h-auto justify-end p-0"
            >
              <Link
                href={`/${nextPost.category.toLowerCase()}/${nextPost.slug}/`}
                className="block w-full"
              >
                <Card className="w-full border-0 shadow-none">
                  <CardHeader className="p-5 text-right">
                    <CardDescription className="font-mono text-[11px] uppercase tracking-widest">
                      Next
                    </CardDescription>
                    <CardTitle className="font-serif text-base font-medium leading-snug">
                      {nextPost.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </nav>

        <div className="mt-4 flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/categories/">
              All essays
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <Utterances
          slug={`/${resolvedParams.category}/${resolvedParams.slug}/`}
        />
      </div>
    </article>
  )
}
