import { notFound } from 'next/navigation'
import { Metadata } from 'next'
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
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ImageComponent: any = (props: any) => {
  const src = props.src || ''
  const cleanSrc = src.replace(/\?style=centerme$/, '')
  const { alt, ...rest } = props
  return <img src={cleanSrc} alt={alt || ''} style={{ maxWidth: '100%', height: 'auto' }} {...rest} />
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.category, resolvedParams.slug)

  if (!post) notFound()

  return (
    <article className="post-content">
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{post.title}</h1>
        <time style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      </header>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ img: ImageComponent }}
      >
        {post.content}
      </ReactMarkdown>
      <Utterances slug={`/${resolvedParams.category}/${resolvedParams.slug}/`} />
    </article>
  )
}