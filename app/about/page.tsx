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
    <article>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{page.title}</h1>
      <div style={{ lineHeight: '1.7' }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {page.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}