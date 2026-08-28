import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VARIABLE',
  description: 'A WEB LOG ABOUT PROGRAMMING, SOFTWARE, TECHNOLOGY, LIFE AND MY THOUGHTS IN GENERAL.',
}

export default function HomePage() {
  const posts = getAllPosts()
  const recentPosts = posts.slice(0, 10)
  const totalPosts = posts.length
  const categories = [...new Set(posts.map(p => p.category))].length

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '48px', marginBottom: '48px' }}>
        <div>
          <h1 className="h1-xl" style={{ marginBottom: '8px' }}>VARIABLE</h1>
          <p className="site-tagline" style={{ maxWidth: '400px' }}>A WEB LOG ABOUT PROGRAMMING, SOFTWARE, TECHNOLOGY, LIFE AND MY THOUGHTS IN GENERAL</p>
        </div>
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '16px' }}>
              <span className="data-label">TOTAL ENTRIES</span>
              <span className="h1-sm" style={{ fontFamily: "'Archivo Black', sans-serif", color: 'var(--accent)', lineHeight: 1 }}>{totalPosts}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <span className="data-label">CATEGORIES</span>
              <span className="h1-sm" style={{ fontFamily: "'Archivo Black', sans-serif", color: 'var(--accent)', lineHeight: 1 }}>{categories}</span>
            </div>
          </div>
          <div style={{ borderTop: '2px solid var(--border)', paddingTop: '16px', marginTop: '16px' }}>
            <Link href="/categories/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', width: 'fit-content' }}>
              VIEW ALL CATEGORIES
              <span style={{ fontSize: '10px' }}>▶</span>
            </Link>
          </div>
        </div>
      </div>

      <hr className="rule rule-thick" />

      <section style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 className="h2" style={{ marginBottom: 0 }}>RECENT TRANSMISSIONS</h2>
          <Link href="/categories/" className="nav-link" style={{ alignSelf: 'flex-end' }}>
            ARCHIVE
            <span style={{ fontSize: '10px' }}>▶</span>
          </Link>
        </div>

        <ul className="post-list">
          {recentPosts.map(post => (
            <li key={post.slug} className="post-item">
              <Link href={`/${post.category.toLowerCase()}/${post.slug}/`} className="post-link">
                <h3 className="post-title">{post.title}</h3>
                <div className="post-meta">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                  <span className="post-category">{post.category.toUpperCase()}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {posts.length > 10 && (
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Link href="/categories/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 24px', border: '2px solid var(--border)' }}>
              LOAD FULL ARCHIVE ({posts.length} ENTRIES)
              <span style={{ fontSize: '10px' }}>▶</span>
            </Link>
          </div>
        )}
      </section>

      <hr className="rule rule-thick" />

      <section>
        <h2 className="h2" style={{ marginBottom: '24px' }}>SYSTEM STATUS</h2>
        <div className="grid grid-cols-3" style={{ maxWidth: '800px' }}>
          <div className="grid-cell">
            <div className="bracket" style={{ marginBottom: '8px' }}>[ BUILD ]</div>
            <div className="h1-md" style={{ fontFamily: "'Archivo Black', sans-serif", color: 'var(--accent)', lineHeight: 1 }}>PASSING</div>
            <p className="meta" style={{ marginTop: '8px', marginBottom: 0 }}>LAST DEPLOY: {new Date().toISOString().split('T')[0]}</p>
          </div>
          <div className="grid-cell">
            <div className="bracket" style={{ marginBottom: '8px' }}>[ ENGINE ]</div>
            <div className="h1-md" style={{ fontFamily: "'Archivo Black', sans-serif", color: 'var(--accent)', lineHeight: 1 }}>NEXT.JS 15</div>
            <p className="meta" style={{ marginTop: '8px', marginBottom: 0 }}>REACT 19 · TYPESCRIPT</p>
          </div>
          <div className="grid-cell">
            <div className="bracket" style={{ marginBottom: '8px' }}>[ DEPLOY ]</div>
            <div className="h1-md" style={{ fontFamily: "'Archivo Black', sans-serif", color: 'var(--accent)', lineHeight: 1 }}>GITHUB PAGES</div>
            <p className="meta" style={{ marginTop: '8px', marginBottom: 0 }}>STATIC EXPORT · TRAILING SLASH</p>
          </div>
        </div>
      </section>

      <div className="marker marker-subtle" style={{ position: 'fixed', bottom: '24px', right: '24px', pointerEvents: 'none', zIndex: 1, userSelect: 'none' }}>VARIABLE</div>
    </div>
  )
}