import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { Metadata } from 'next'
import { ArrowRightIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Variable',
  description: 'A web log about programming, software, technology, life and my thoughts in general.',
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length
  return `${Math.max(1, Math.round(words / 220))} min`
}

export default function HomePage() {
  const posts = getAllPosts()
  const recentPosts = posts.slice(0, 7)
  const latestPost = posts[0]
  const totalPosts = posts.length

  const groupedByYear = recentPosts.reduce<Record<string, typeof recentPosts>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})
  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div>
      {/* Hero: asymmetric split, fits viewport */}
      <section className="section" aria-labelledby="hero-heading" style={{ paddingTop: '3rem', paddingBottom: '3rem', minHeight: 'auto' }}>
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center">
          <div className="reveal reveal-1">
            <p className="meta mb-4" style={{ color: 'var(--color-accent)' }}>Est. 2020 · Pune</p>
            <h1 id="hero-heading" style={{ marginBottom: '1rem' }}>
              Writing about <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-muted)' }}>software</em> and the people who make it.
            </h1>
            <p className="lead" style={{ marginBottom: '1.75rem' }}>
              Notes on programming, distributed systems, and learning in public by Ajinkya Bawaskar.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link href={latestPost ? `/${latestPost.category.toLowerCase()}/${latestPost.slug}/` : '/categories/'} className="btn btn-accent">
                Read the latest
                <ArrowRightIcon size={14} />
              </Link>
              <Link href="/about/" className="btn btn-secondary">About the author</Link>
            </div>
            <p className="meta mt-6" style={{ textTransform: 'none', letterSpacing: '0', fontSize: '12px', color: 'var(--color-muted)' }}>
              {totalPosts} essays, {[...new Set(posts.map(p => p.category))].length} topics, updated {latestPost ? new Date(latestPost.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'recently'}
            </p>
          </div>

          <div className="reveal reveal-2">
            <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '16px' }}>
              <img
                src="https://picsum.photos/seed/variable-hero-typewriter/800/640"
                alt="Minimal desk with open notebook and soft window light"
                width={800}
                height={640}
                style={{ width: '100%', aspectRatio: '4 / 3.2', objectFit: 'cover', display: 'block' }}
                loading="eager"
              />
              <div className="flex items-center justify-between gap-3" style={{ padding: '0.9rem 1.1rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-canvas-warm)' }}>
                <span className="meta" style={{ letterSpacing: '0.06em' }}>Currently reading: Caching in Spring Boot</span>
                <span className="meta" style={{ color: 'var(--color-muted-light)' }}>2023</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="thick" aria-hidden="true" />

      {/* Featured essay: horizontal editorial card, different layout from hero */}
      {latestPost && (
        <section className="section" aria-labelledby="featured-heading">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <h2 id="featured-heading" className="reveal reveal-1" style={{ fontSize: '22px', letterSpacing: '-0.03em' }}>Latest essay</h2>
            <Link href="/categories/" className="meta reveal reveal-1" style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Browse archive</Link>
          </div>

          <Link href={`/${latestPost.category.toLowerCase()}/${latestPost.slug}/`} className="card reveal reveal-2" style={{ display: 'grid', gridTemplateColumns: '1fr', padding: 0, overflow: 'hidden', borderRadius: '16px', textDecoration: 'none' }}>
            <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-0">
              <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="tag">{latestPost.category}</span>
                  <span className="meta">{new Date(latestPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} / {estimateReadTime(latestPost.content)} read</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', lineHeight: 1.15, letterSpacing: '-0.03em', color: 'var(--color-fg)', marginBottom: '0.75rem' }}>
                  {latestPost.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--color-muted)', maxWidth: '52ch', marginBottom: '1.25rem' }}>
                  {latestPost.content.slice(0, 190).replace(/[#*`\[\]]/g, '').trim()}...
                </p>
                <span className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Continue reading
                  <ArrowRightIcon size={12} />
                </span>
              </div>
              <div style={{ background: 'var(--color-canvas-warm)', borderLeft: '1px solid var(--color-border)', minHeight: '280px', overflow: 'hidden' }}>
                <img
                  src={`https://picsum.photos/seed/${latestPost.slug}/720/560`}
                  alt=""
                  width={720}
                  height={560}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
            </div>
          </Link>
        </section>
      )}

      <hr className="thick" aria-hidden="true" />

      {/* Archive: chronological index, editorial list */}
      <section className="section" aria-labelledby="recent-heading">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <h2 id="recent-heading" className="reveal reveal-1" style={{ fontSize: '22px' }}>Recent essays</h2>
          <span className="meta reveal reveal-1">{posts.length} total</span>
        </div>

        <div className="reveal reveal-2">
          {years.map((year) => (
            <div key={year} style={{ marginBottom: '2rem' }}>
              <div className="flex items-center gap-3 mb-3">
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-muted)', borderLeft: '2px solid var(--color-accent)', paddingLeft: '0.6rem' }}>{year}</span>
                <span style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} aria-hidden="true" />
                <span className="meta">{groupedByYear[year].length} essays</span>
              </div>
              <ul className="archive-list" role="list">
                {groupedByYear[year].map((post) => (
                  <li key={post.slug} className="archive-item" role="listitem">
                    <time dateTime={post.date} className="archive-date">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </time>
                    <Link href={`/${post.category.toLowerCase()}/${post.slug}/`} style={{ minWidth: 0 }}>
                      <span className="archive-title">{post.title}</span>
                    </Link>
                    <span className="archive-category">{post.category}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {posts.length > 7 && (
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link href="/categories/" className="btn btn-secondary">
              View full archive
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        )}
      </section>

      <hr className="thick" aria-hidden="true" />

      {/* Quiet closing: no bento, just type and hairline */}
      <section className="section" aria-labelledby="colophon-heading" style={{ paddingBottom: '4rem' }}>
        <div className="content-wide">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-12 items-start">
            <div className="reveal reveal-1">
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', lineHeight: 1.35, letterSpacing: '-0.02em', color: 'var(--color-fg)', fontStyle: 'italic', marginBottom: '1rem' }}>
                Software is less about software and more about people.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-muted)', maxWidth: '42ch' }}>
                This site has been my public notebook since 2020. I write to clarify my own thinking and to leave a trail for anyone on a similar path.
              </p>
            </div>
            <div className="reveal reveal-2" style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '1.5rem' }}>
              <p className="meta mb-3">Explore</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li><Link href="/categories/" style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--color-fg)', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: 'var(--color-border)' }}>Browse by category</Link><span className="meta" style={{ marginLeft: '0.5rem' }}>{[...new Set(posts.map(p => p.category))].join(', ')}</span></li>
                <li><Link href="/about/" style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--color-fg)', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: 'var(--color-border)' }}>About the author</Link><span className="meta" style={{ marginLeft: '0.5rem' }}>Pune, Backend, Writing</span></li>
                <li><a href="/feed.xml" style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--color-fg)', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: 'var(--color-border)' }}>Subscribe via RSS</a><span className="meta" style={{ marginLeft: '0.5rem' }}>Stay updated</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
