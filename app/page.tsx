import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Latest Posts</h1>
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/${post.category.toLowerCase()}/${post.slug}/`} className="post-title">
              {post.title}
            </Link>
            <p className="post-meta">
              <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
              <span style={{ marginLeft: '1rem', color: 'var(--accent)', fontSize: '0.85rem', textTransform: 'capitalize' }}>
                {post.category}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}