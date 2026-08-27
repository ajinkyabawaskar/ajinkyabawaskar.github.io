import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPage } from '@/lib/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  const page = getPage('about')

  if (!page) return <div>About page not found</div>

  return (
    <article className="about-content">
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{page.title}</h1>
      <div className="post-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {page.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}