import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'

export default function HomePage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  const postsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = posts.filter(p => p.category.toLowerCase() === cat.toLowerCase())
    return acc
  }, {} as Record<string, typeof posts>)

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Posts</h1>
      {categories.map(category => (
        <section key={category} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.3rem', marginBottom: '1rem' }}>
            {category}
          </h2>
          <ul className="post-list">
            {postsByCategory[category]?.map(post => (
              <li key={post.slug}>
                <Link href={`/${category.toLowerCase()}/${post.slug}/`} className="post-title">
                  {post.title}
                </Link>
                <p className="post-meta">
                  <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}