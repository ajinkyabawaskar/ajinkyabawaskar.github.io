import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CATEGORIES',
}

export default function CategoriesPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  const postsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = posts.filter(p => p.category.toLowerCase() === cat.toLowerCase())
    return acc
  }, {} as Record<string, typeof posts>)

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '64px' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 className="h1-xl" style={{ marginBottom: '8px' }}>CATEGORIES</h1>
        <p className="site-tagline" style={{ maxWidth: '500px' }}>INDEX OF ALL TRANSMISSIONS GROUPED BY CLASSIFICATION</p>
      </div>

      <hr className="rule rule-thick" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {categories.map(category => {
          const catPosts = postsByCategory[category] || []
          return (
            <Link
              key={category}
              href={`/${category.toLowerCase()}/`}
              className="frame panel-accent category-card"
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div className="category-header">
                <h2 className="category-title">{category.toUpperCase()}</h2>
                <span className="category-count">{catPosts.length} ENTRIES</span>
              </div>
              <ul className="post-list" style={{ flex: 1, overflow: 'hidden' }}>
                {catPosts.slice(0, 5).map(post => (
                  <li key={post.slug} className="post-item" style={{ borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
                    <div className="post-title" style={{ fontSize: '1rem', marginBottom: '6px' }}>{post.title}</div>
                    <time className="meta" style={{ fontSize: '11px' }} dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </time>
                  </li>
                ))}
                {catPosts.length > 5 && (
                  <li className="post-item" style={{ border: 'none', padding: '12px 0 0', textAlign: 'right' }}>
                    <span className="meta" style={{ color: 'var(--accent)' }}>+ {catPosts.length - 5} MORE ENTRIES</span>
                  </li>
                )}
              </ul>
            </Link>
          )
        })}
      </div>

      {categories.length === 0 && (
        <div className="panel" style={{ textAlign: 'center', padding: '64px 24px' }}>
          <p className="meta">NO CATEGORIES FOUND</p>
          <p style={{ marginTop: '16px' }}>TRANSMISSIONS WILL APPEAR HERE ONCE PUBLISHED</p>
        </div>
      )}

      <div className="marker marker-subtle" style={{ position: 'fixed', bottom: '24px', right: '24px', pointerEvents: 'none', zIndex: 1, userSelect: 'none' }}>CATEGORIES</div>
    </div>
  )
}