import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories',
}

export default function CategoriesPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  const postsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = posts.filter(p => p.category.toLowerCase() === cat.toLowerCase())
    return acc
  }, {} as Record<string, typeof posts>)

  return (
    <div className="categories-page">
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Categories</h1>
      {categories.map(category => {
        const catPosts = postsByCategory[category] || []
        return (
          <section key={category} style={{ marginBottom: '2rem' }}>
            <h2 id={category.toLowerCase()} style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
              {category} ({catPosts.length})
            </h2>
            <ul className="post-list">
              {catPosts.map(post => (
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
        )
      })}
    </div>
  )
}