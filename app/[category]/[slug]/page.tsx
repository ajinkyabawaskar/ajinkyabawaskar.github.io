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
  if (!post) return { title: 'POST NOT FOUND' }

  return {
    title: post.title.toUpperCase(),
    description: post.content.slice(0, 160).replace(/[#*`\[\]]/g, ''),
  }
}

function preprocessMarkdown(content: string): string {
  return content
    .replace(/!\[([^\]]*)\]\(\/assets\/img\/([^)]+)\?style=centerme\)/g, '![$1](/img/$2)')
    .replace(/!\[([^\]]*)\]\(\/assets\/img\/([^)]+)\)/g, '![$1](/img/$2)')
    .replace(/\?style=centerme/g, '')
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.category, resolvedParams.slug)

  if (!post) notFound()

  const processedContent = preprocessMarkdown(post.content)

  return (
    <article style={{ paddingTop: '48px', paddingBottom: '64px' }}>
      <header className="article-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span className="bracket-accent">[</span>
          <Link href={`/${resolvedParams.category.toLowerCase()}/`} className="post-category" style={{ textDecoration: 'none', border: '1px solid var(--accent)', padding: '4px 12px' }}>
            {resolvedParams.category.toUpperCase()}
          </Link>
          <span className="bracket-accent">]</span>
          <span className="meta" style={{ marginLeft: 'auto' }}>
            <data value={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</data>
          </span>
        </div>
        <h1 className="article-title">{post.title.toUpperCase()}</h1>
      </header>

      <div className="article-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {processedContent}
        </ReactMarkdown>
      </div>

      <Utterances slug={`/${resolvedParams.category}/${resolvedParams.slug}/`} />
    </article>
  )
}