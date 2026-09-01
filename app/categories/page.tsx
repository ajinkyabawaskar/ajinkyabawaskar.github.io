import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/posts'
import { Metadata } from 'next'
import { ArrowRightIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Browse all essays by category.',
}

export default function CategoriesPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const postsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = posts.filter(p => p.category.toLowerCase() === cat.toLowerCase())
    return acc
  }, {} as Record<string, typeof posts>)

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <header className="content-wide mb-10 reveal reveal-1">
        <p className="meta mb-3" style={{ color: 'var(--color-accent)' }}>Archive</p>
        <h1 style={{ marginBottom: '0.75rem' }}>Archive</h1>
        <p className="lead" style={{ maxWidth: '52ch' }}>
          {posts.length} essays across {categories.length} categories. Chronological index, no algorithm.
        </p>
      </header>

      <hr className="thick content-wide" style={{ marginBottom: '2rem' }} aria-hidden="true" />

      <div className="content-wide">
        {categories.length === 0 ? (
          <p className="meta" style={{ textAlign: 'center', padding: '3rem 0' }}>No essays yet.</p>
        ) : (
          <div style={{ display: 'grid', gap: '2.5rem' }}>
            {categories.map((category, idx) => {
              const catPosts = postsByCategory[category] || []
              return (
                <section key={category} className={`reveal reveal-${Math.min(idx + 1, 4)}`}>
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <h2 style={{ fontSize: '20px' }}>{category}</h2>
                    <span className="meta">{catPosts.length} essays</span>
                  </div>
                  <ul className="archive-list" role="list">
                    {catPosts.map((post) => (
                      <li key={post.slug} className="archive-item" role="listitem">
                        <time dateTime={post.date} className="archive-date">
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                        <Link href={`/${post.category.toLowerCase()}/${post.slug}/`} style={{ minWidth: 0 }}>
                          <span className="archive-title">{post.title}</span>
                        </Link>
                        <Link href={`/${post.category.toLowerCase()}/${post.slug}/`} className="meta" aria-label={`Read ${post.title}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>
                          Read <ArrowRightIcon size={10} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        )}

        <hr className="thick" style={{ margin: '2.5rem 0' }} aria-hidden="true" />
        <div className="flex items-center gap-3 flex-wrap">
          <Link href="/" className="btn btn-secondary">Back to home</Link>
          <a href="/feed.xml" className="btn btn-ghost">Subscribe via RSS</a>
        </div>
      </div>
    </div>
  )
}
