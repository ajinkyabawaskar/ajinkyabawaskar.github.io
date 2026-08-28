import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import Utterances from '@/components/Utterances'

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M200,216a16,16,0,0,1-22.63-22.63l54.87-54.87H40a16,16,0,0,1,0-32h192.24l-54.87-54.86A16,16,0,1,1,200,40l80,80A16,16,0,0,1,200,216Z"/>
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192A88,88,0,1,1,216,128,88.1,88.1,0,0,1,128,216ZM128,104a8,8,0,0,1,8,8v48a8,8,0,0,1-16,0V120a8,8,0,0,1,8-8Zm0,80a16,16,0,1,1-16-16A16,16,0,0,1,128,184Z"/>
  </svg>
)

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M216,48H94.83L82.34,35.51A16,16,0,0,0,68,32H40a24,24,0,0,0-24,24v160a24,24,0,0,0,24,24h176a24,24,0,0,0,24-24V72A24,24,0,0,0,216,48ZM40,72h176v160H40Z"/>
  </svg>
)

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M216,176H88a16,16,0,0,1,0-32h80v-64a16,16,0,0,1,32,0v64h80a16,16,0,0,1,0,32ZM40,112a16,16,0,0,1-16-16V40a16,16,0,0,1,32,0v56a16,16,0,0,1-16,16ZM40,192a16,16,0,0,1-16-16v-56a16,16,0,0,1,32,0v56a16,16,0,0,1-16,16Z"/>
  </svg>
)

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
            <FolderIcon />
            {resolvedParams.category}
          </Link>
          <time dateTime={post.date} className="meta flex items-center gap-1">
            <ClockIcon />
            {formattedDate}
          </time>
        </div>
        <h1 id="post-title" className="article-title fade-in-up stagger-2">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 flex-wrap mt-6 fade-in-up stagger-3">
          <Link href="/" className="btn btn-ghost">
            <ArrowLeftIcon />
            Back to Home
          </Link>
          <button className="btn btn-ghost" aria-label="Share this article">
            <ShareIcon />
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