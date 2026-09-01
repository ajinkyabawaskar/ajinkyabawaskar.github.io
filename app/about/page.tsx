import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPage } from '@/lib/posts'
import { Metadata } from 'next'
import Link from 'next/link'
import { GithubLogoIcon, LinkedinLogoIcon, RssIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Ajinkya Bawaskar, software engineer, writer, and the author of Variable.',
}

export default function AboutPage() {
  const page = getPage('about')

  if (!page) return (
    <div className="section" style={{ textAlign: 'center' }}>
      <p className="meta">About page not found</p>
    </div>
  )

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <header className="content-wide mb-10 reveal reveal-1">
        <p className="meta mb-3" style={{ color: 'var(--color-accent)' }}>About</p>
        <h1 style={{ marginBottom: '1rem' }}>Ajinkya Bawaskar</h1>
        <p className="lead" style={{ maxWidth: '52ch' }}>
          Software engineer and writer based in Pune. I build backend systems and write to think clearly.
        </p>
      </header>

      <hr className="thick content-wide" style={{ marginBottom: '2.5rem' }} aria-hidden="true" />

      <div className="content-wide">
        <div className="grid lg:grid-cols-[0.9fr_1.6fr] gap-10 lg:gap-12 items-start">
          <aside className="reveal reveal-2" style={{ position: 'sticky', top: '88px' }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '16px' }}>
              <img
                src="https://picsum.photos/seed/ajinkya-portrait/560/680"
                alt="Portrait placeholder for Ajinkya Bawaskar"
                width={560}
                height={680}
                style={{ width: '100%', aspectRatio: '4 / 4.8', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '1.25rem 1.25rem 1.1rem', borderTop: '1px solid var(--color-border)' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', letterSpacing: '-0.02em', color: 'var(--color-fg)', marginBottom: '0.25rem' }}>Ajinkya Bawaskar</p>
                <p className="meta" style={{ textTransform: 'none', letterSpacing: '0', fontSize: '12px' }}>Backend, distributed systems, Go, TypeScript</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                  <a href="https://github.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-muted)', border: '1px solid var(--color-border)', borderRadius: '100px', padding: '0.55rem 0.85rem' }}>
                    <GithubLogoIcon size={13} /> GitHub
                  </a>
                  <a href="https://linkedin.com/in/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-muted)', border: '1px solid var(--color-border)', borderRadius: '100px', padding: '0.55rem 0.85rem' }}>
                    <LinkedinLogoIcon size={13} /> LinkedIn
                  </a>
                  <a href="mailto:ajinkyabawaskar2@gmail.com" className="flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-muted)', border: '1px solid var(--color-border)', borderRadius: '100px', padding: '0.55rem 0.85rem' }}>
                    <RssIcon size={13} /> Email
                  </a>
                </div>
                <dl style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', display: 'grid', gap: '0.5rem' }}>
                  <div className="flex items-center justify-between gap-2"><dt className="meta">Location</dt><dd style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-fg-soft)' }}>Pune, India</dd></div>
                  <div className="flex items-center justify-between gap-2"><dt className="meta">Writing since</dt><dd style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-fg-soft)' }}>2020</dd></div>
                  <div className="flex items-center justify-between gap-2"><dt className="meta">Focus</dt><dd style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-fg-soft)' }}>Backend systems</dd></div>
                </dl>
              </div>
            </div>
          </aside>

          <main className="reveal reveal-3">
            <div className="article-content" style={{ maxWidth: 'none' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {page.content}
              </ReactMarkdown>
            </div>

            <hr className="thick" style={{ margin: '2.5rem 0' }} aria-hidden="true" />

            <section aria-labelledby="connect-heading">
              <h2 id="connect-heading" style={{ fontSize: '20px', marginBottom: '1rem' }}>Keep reading</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                <Link href="/categories/" className="card" style={{ padding: '1.1rem', textAlign: 'left' }}>
                  <span className="meta" style={{ display: 'block', marginBottom: '0.4rem' }}>Archive</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: 'var(--color-fg)' }}>Browse essays</span>
                </Link>
                <a href="https://github.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="card" style={{ padding: '1.1rem', textAlign: 'left' }}>
                  <span className="meta" style={{ display: 'block', marginBottom: '0.4rem' }}>Code</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: 'var(--color-fg)' }}>GitHub</span>
                </a>
                <a href="/feed.xml" className="card" style={{ padding: '1.1rem', textAlign: 'left' }}>
                  <span className="meta" style={{ display: 'block', marginBottom: '0.4rem' }}>Subscribe</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', color: 'var(--color-fg)' }}>RSS feed</span>
                </a>
              </div>
            </section>

            <section style={{ marginTop: '2.5rem', padding: '1.25rem', background: 'var(--color-canvas-warm)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>Currently exploring</h3>
              <div className="flex flex-wrap gap-2">
                <span className="tag">Go</span>
                <span className="tag">Kubernetes</span>
                <span className="tag">Distributed systems</span>
                <span className="tag">TypeScript</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">Observability</span>
              </div>
            </section>

            <section style={{ marginTop: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>Colophon</h3>
              <dl style={{ display: 'grid', gap: '0.35rem', fontSize: '13px', color: 'var(--color-fg-soft)' }}>
                <div className="flex gap-3"><dt className="meta" style={{ minWidth: '120px' }}>Engine</dt><dd>Next.js 15, React 19</dd></div>
                <div className="flex gap-3"><dt className="meta" style={{ minWidth: '120px' }}>Styling</dt><dd>Tailwind v4, EB Garamond, Geist</dd></div>
                <div className="flex gap-3"><dt className="meta" style={{ minWidth: '120px' }}>Content</dt><dd>Markdown, Gray Matter</dd></div>
                <div className="flex gap-3"><dt className="meta" style={{ minWidth: '120px' }}>Hosting</dt><dd>GitHub Pages, static export</dd></div>
              </dl>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
