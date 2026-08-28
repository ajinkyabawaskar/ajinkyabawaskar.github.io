import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import Utterances from '@/components/Utterances'
import { ArrowLeftIcon, ClockIcon, FolderIcon, ShareIcon } from '@/components/Icons'

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

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.category, resolvedParams.slug)

  if (!post) notFound()

  const processedContent = preprocessMarkdown(post.content)
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <article className="section-xl" aria-labelledby="post-title">
      <div className="ambient-glow" aria-hidden="true" />

      <header className="article-header content-width fade-in-up stagger-1">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <Link href={`/${resolvedParams.category.toLowerCase()}/`} className="tag tag-blue">
            <FolderIcon size={12} />
            {resolvedParams.category}
          </Link>
          <time dateTime={post.date} className="meta flex items-center gap-1">
            <ClockIcon size={12} />
            {formattedDate}
          </time>
        </div>
        <h1 id="post-title" className="article-title fade-in-up stagger-2">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 flex-wrap mt-6 fade-in-up stagger-3">
          <Link href="/" className="btn btn-ghost">
            <ArrowLeftIcon size={14} />
            Back to Home
          </Link>
          <button className="btn btn-ghost" aria-label="Share this article">
            <ShareIcon size={16} />
          </button>
        </div>
      </header>

      <div className="content-width">
        <div className="article-content fade-in-up stagger-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {processedContent}
          </ReactMarkdown>
        </div>

        <Utterances slug={`/${resolvedParams.category}/${resolvedParams.slug}/`} />
      </div>
    </article>
  )
}