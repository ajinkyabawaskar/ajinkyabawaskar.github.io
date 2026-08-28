import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { Metadata } from 'next'
import { ArrowRightIcon, ClockIcon, FolderIcon, BookOpenIcon, TerminalIcon } from '@/components/Icons'

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
                  <BookOpenIcon size={12} />
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
                  <FolderIcon size={12} />
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
                  <ClockIcon size={12} />
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
                <ArrowRightIcon size={14} />
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
                  <ArrowRightIcon size={14} />
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
              <ArrowRightIcon size={14} />
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
                      <ArrowRightIcon size={12} />
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
                <ArrowRightIcon size={14} />
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
                <TerminalIcon size={12} />
                Build
              </span>
            </div>
            <p className="h3" style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.2, color: 'var(--color-fg)', marginBottom: '0.5rem' }}>Passing</p>
            <p className="meta">Last deploy: {new Date().toISOString().split('T')[0]}</p>
          </article>
          <article className="card fade-in-up stagger-3" role="listitem">
            <div className="flex items-center gap-3 mb-3">
              <span className="tag tag-blue">
                <BookOpenIcon size={12} />
                Engine
              </span>
            </div>
            <p className="h3" style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.2, color: 'var(--color-fg)', marginBottom: '0.5rem' }}>Next.js 15</p>
            <p className="meta">React 19 · TypeScript · Static Export</p>
          </article>
          <article className="card fade-in-up stagger-4" role="listitem">
            <div className="flex items-center gap-3 mb-3">
              <span className="tag tag-yellow">
                <FolderIcon size={12} />
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