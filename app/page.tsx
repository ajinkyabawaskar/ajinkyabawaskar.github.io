import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { Metadata } from 'next'

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M56,216a16,16,0,0,0,22.63,22.63l54.87-54.87H216a16,16,0,0,0,0-32H133.5l54.87-54.86A16,16,0,0,0,56,40l80,80A16,16,0,0,0,56,216Z"/>
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192A88,88,0,1,1,216,128,88.1,88.1,0,0,1,128,216ZM128,104a8,8,0,0,1,8,8v48a8,8,0,0,1-16,0V120a8,8,0,0,1,8-8Zm0,80a16,16,0,1,1-16-16A16,16,0,0,1,128,184Z"/>
  </svg>
)

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M216,48H94.83L82.34,35.51A16,16,0,0,0,68,32H40a24,24,0,0,0-24,24v160a24,24,0,0,0,24,24h176a24,24,0,0,0,24-24V72A24,24,0,0,0,216,48ZM40,72h176v160H40Z"/>
  </svg>
)

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M216,48H94.83L82.34,35.51A16,16,0,0,0,68,32H40a24,24,0,0,0-24,24v160a24,24,0,0,0,24,24h176a24,24,0,0,0,24-24V72A24,24,0,0,0,216,48ZM40,72h176v160H40Z"/>
  </svg>
)

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M200,32H56a24,24,0,0,0-24,24v168a24,24,0,0,0,24,24h144a24,24,0,0,0,24-24V56A24,24,0,0,0,200,32ZM104,112a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H112a8,8,0,0,1-8-8Zm0,48a8,8,0,0,1,8-8h56a8,8,0,0,1,0,16H112a8,8,0,0,1-8-8Zm0,48a8,8,0,0,1,8-8h24a8,8,0,0,1,0,16H112a8,8,0,0,1-8-8Z"/>
  </svg>
)

export const metadata: Metadata = {
  title: 'Variable',
  description: 'A web log about programming, software, technology, life and my thoughts in general.',
}

export default function HomePage() {
  const posts = getAllPosts()
  const recentPosts = posts.slice(0, 8)
  const totalPosts = posts.length
  const categories = [...new Set(posts.map(p => p.category))].length

  const latestPost = posts[0]

  return (
    <div className="section-xl">
      <div className="ambient-glow" aria-hidden="true" />

      {/* Hero Section */}
      <section className="mb-16" aria-labelledby="hero-heading">
        <div className="content-width">
          <header className="mb-12">
            <h1 id="hero-heading" className="fade-in-up stagger-1">
              Variable
            </h1>
            <p className="lead fade-in-up stagger-2 mt-4 max-w-[60ch]">
              A web log about programming, software, technology, life and my thoughts in general.
            </p>
          </header>

          {/* Stats Bar */}
          <div className="bento-grid bento-grid-3 bento-grid-auto gap-4 fade-in-up stagger-3" role="list" aria-label="Site statistics">
            <article className="card" role="listitem">
              <div className="flex items-center gap-3 mb-2">
                <span className="tag tag-blue" aria-label="Total posts">
                  <BookOpenIcon />
                  Posts
                </span>
              </div>
              <p className="h1" style={{ fontFamily: 'var(--font-serif)', lineHeight: 1, color: 'var(--color-fg)' }}>
                {totalPosts}
              </p>
              <p className="meta mt-1">Total entries published</p>
            </article>

            <article className="card" role="listitem">
              <div className="flex items-center gap-3 mb-2">
                <span className="tag tag-green" aria-label="Categories">
                  <FolderIcon />
                  Categories
                </span>
              </div>
              <p className="h1" style={{ fontFamily: 'var(--font-serif)', lineHeight: 1, color: 'var(--color-fg)' }}>
                {categories}
              </p>
              <p className="meta mt-1">Active classifications</p>
            </article>

            <article className="card" role="listitem">
              <div className="flex items-center gap-3 mb-2">
                <span className="tag tag-yellow" aria-label="Latest update">
                  <ClockIcon />
                  Latest
                </span>
              </div>
              <p className="h1" style={{ fontFamily: 'var(--font-serif)', lineHeight: 1, color: 'var(--color-fg)' }}>
                {latestPost ? new Date(latestPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
              </p>
              <p className="meta mt-1">Most recent publication</p>
            </article>
          </div>
        </div>
      </section>

      <hr className="thick mb-16" aria-hidden="true" />

      {/* Featured / Latest Post */}
      {latestPost && (
        <section className="mb-16" aria-labelledby="featured-heading">
          <div className="content-width">
            <header className="flex items-baseline justify-between gap-4 mb-8 flex-wrap">
              <h2 id="featured-heading" className="fade-in-up stagger-1">Latest Transmission</h2>
              <Link href="/categories/" className="btn btn-ghost fade-in-up stagger-2">
                View Archive
                <ArrowRightIcon />
              </Link>
            </header>

            <article className="card bento-grid bento-grid-2 gap-8 fade-in-up stagger-3" style={{ padding: '2.5rem' }}>
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <Link href={`/${latestPost.category.toLowerCase()}/${latestPost.slug}/`} className="tag tag-blue">
                    {latestPost.category}
                  </Link>
                  <time dateTime={latestPost.date} className="meta">
                    {new Date(latestPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>
                <Link href={`/${latestPost.category.toLowerCase()}/${latestPost.slug}/`}>
                  <h3 className="h2" style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--color-fg)', transition: 'color var(--transition-fast)' }}>
                    {latestPost.title}
                  </h3>
                </Link>
                <p className="lead mt-4" style={{ maxWidth: '55ch' }}>
                  {latestPost.content.slice(0, 280).replace(/[#*`\[\]]/g, '')}…
                </p>
              </div>
              <div className="flex items-end justify-end">
                <Link href={`/${latestPost.category.toLowerCase()}/${latestPost.slug}/`} className="btn btn-primary">
                  Read Article
                  <ArrowRightIcon />
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      <hr className="thick mb-16" aria-hidden="true" />

      {/* Recent Posts List */}
      <section aria-labelledby="recent-heading">
        <div className="content-width">
          <header className="flex items-baseline justify-between gap-4 mb-10 flex-wrap">
            <h2 id="recent-heading" className="fade-in-up stagger-1">Recent Transmissions</h2>
            <Link href="/categories/" className="btn btn-ghost fade-in-up stagger-2">
              View All
              <ArrowRightIcon />
            </Link>
          </header>

          <ul className="post-list" role="list">
            {recentPosts.map((post, index) => (
              <li key={post.slug} className="post-item fade-in-up" style={{ animationDelay: `${Math.min(index * 80 + 240, 800)}ms` }}>
                <Link href={`/${post.category.toLowerCase()}/${post.slug}/`} className="post-link">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="tag tag-blue">{post.category}</span>
                        <time dateTime={post.date} className="meta">
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </time>
                      </div>
                      <h3 className="post-title" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)' }}>
                        {post.title}
                      </h3>
                    </div>
                    <span className="flex items-center gap-1 text-[var(--color-muted-light)] transition-colors group-hover:text-[var(--color-fg)]" aria-hidden="true">
                      <ArrowRightIcon />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {posts.length > 8 && (
            <div className="text-center mt-12 fade-in-up stagger-1">
              <Link href="/categories/" className="btn btn-secondary">
                Load Full Archive ({posts.length} entries)
                <ArrowRightIcon />
              </Link>
            </div>
          )}
        </div>
      </section>

      <hr className="thick mt-16 mb-16" aria-hidden="true" />

      {/* System Info / Footer CTA */}
      <section className="content-width" aria-labelledby="system-heading">
        <header className="mb-8">
          <h2 id="system-heading" className="fade-in-up stagger-1" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', letterSpacing: '-0.02em' }}>
            System Status
          </h2>
        </header>
        <div className="bento-grid bento-grid-3 bento-grid-auto gap-4">
          <article className="card fade-in-up stagger-2" role="listitem">
            <div className="flex items-center gap-3 mb-3">
              <span className="tag tag-green">
                <TerminalIcon />
                Build
              </span>
            </div>
            <p className="h3" style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.2, color: 'var(--color-fg)', marginBottom: '0.5rem' }}>Passing</p>
            <p className="meta">Last deploy: {new Date().toISOString().split('T')[0]}</p>
          </article>
          <article className="card fade-in-up stagger-3" role="listitem">
            <div className="flex items-center gap-3 mb-3">
              <span className="tag tag-blue">
                <BookOpenIcon />
                Engine
              </span>
            </div>
            <p className="h3" style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.2, color: 'var(--color-fg)', marginBottom: '0.5rem' }}>Next.js 15</p>
            <p className="meta">React 19 · TypeScript · Static Export</p>
          </article>
          <article className="card fade-in-up stagger-4" role="listitem">
            <div className="flex items-center gap-3 mb-3">
              <span className="tag tag-yellow">
                <FolderIcon />
                Deploy
              </span>
            </div>
            <p className="h3" style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.2, color: 'var(--color-fg)', marginBottom: '0.5rem' }}>GitHub Pages</p>
            <p className="meta">Trailing slash · Zero runtime</p>
          </article>
        </div>
      </section>
    </div>
  )
}