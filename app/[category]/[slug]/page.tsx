import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import Utterances from '@/components/Utterances'

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({
    category: post.category.toLowerCase(),
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.category, resolvedParams.slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.content.slice(0, 160).replace(/[#*`\[\]]/g, ''),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 160).replace(/[#*`\[\]]/g, ''),
      type: 'article',
      publishedTime: post.date,
      authors: ['Ajinkya Bawaskar'],
    },
  }
}

function preprocessMarkdown(content: string): string {
  return content
    .replace(/!\[([^\]]*)\]\(\/assets\/img\/([^)]+)\?style=centerme\)/g, '![$1](/img/$2)')
    .replace(/!\[([^\]]*)\]\(\/assets\/img\/([^)]+)\)/g, '![$1](/img/$2)')
    .replace(/\?style=centerme/g, '')
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
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const readTime = estimateReadTime(post.content)

  const allPosts = getAllPosts()
  const idx = allPosts.findIndex(p => p.slug === resolvedParams.slug && p.category.toLowerCase() === resolvedParams.category.toLowerCase())
  const nextPost = idx > 0 ? allPosts[idx - 1] : null
  const prevPost = idx >= 0 && idx < allPosts.length - 1 ? allPosts[idx + 1] : null

  return (
    <article className="section" aria-labelledby="post-title" style={{ paddingTop: '2.5rem' }}>
      <div className="content-wide">
        <header className="article-header reveal reveal-1">
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <Link href={`/${resolvedParams.category.toLowerCase()}/`} className="tag">{resolvedParams.category}</Link>
            <span className="meta">{formattedDate} / {readTime}</span>
          </div>
          <h1 id="post-title" className="article-title">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 mt-6 flex-wrap">
            <Link href="/" className="btn btn-ghost" style={{ paddingLeft: 0 }}>← Back to index</Link>
            <span className="meta" style={{ color: 'var(--color-border)' }} aria-hidden="true">/</span>
            <Link href="/about/" className="meta" style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>About the author</Link>
          </div>
        </header>

        <div className="reveal reveal-2">
          <div className="article-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {processedContent}
            </ReactMarkdown>
          </div>
        </div>

        <hr className="thick" style={{ margin: '3rem 0' }} aria-hidden="true" />

        <nav aria-label="Post navigation" className="grid md:grid-cols-2 gap-4 reveal reveal-3">
          {prevPost ? (
            <Link href={`/${prevPost.category.toLowerCase()}/${prevPost.slug}/`} className="card" style={{ padding: '1.25rem' }}>
              <span className="meta mb-2" style={{ display: 'block' }}>Previous</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', lineHeight: 1.3, color: 'var(--color-fg)' }}>{prevPost.title}</span>
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link href={`/${nextPost.category.toLowerCase()}/${nextPost.slug}/`} className="card" style={{ padding: '1.25rem', textAlign: 'right' }}>
              <span className="meta mb-2" style={{ display: 'block' }}>Next</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', lineHeight: 1.3, color: 'var(--color-fg)' }}>{nextPost.title}</span>
            </Link>
          ) : <div />}
        </nav>

        <div className="reveal reveal-4">
          <Utterances slug={`/${resolvedParams.category}/${resolvedParams.slug}/`} />
        </div>
      </div>
    </article>
  )
}
