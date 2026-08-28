import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPage } from '@/lib/posts'
import { Metadata } from 'next'
import Link from 'next/link'
import { GithubLogoIcon, LinkedinLogoIcon, RssIcon, MapPinIcon, BriefcaseIcon, MailboxIcon } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Ajinkya Bawaskar — software engineer, writer, and the author of Variable.',
}

export default function AboutPage() {
  const page = getPage('about')

  if (!page) return (
    <div className="section-xl">
      <div className="content-width text-center">
        <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <p className="meta mb-4">About page not found</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="section-xl">
      <div className="ambient-glow" aria-hidden="true" />

      <header className="content-width mb-16">
        <h1 className="fade-in-up stagger-1">About</h1>
        <p className="lead mt-4 fade-in-up stagger-2 max-w-[50ch]">
          Software engineer. Writer. Builder of things that live on the internet.
        </p>
      </header>

      <hr className="thick mb-16 content-width" aria-hidden="true" />

      <div className="content-width">
        <div className="bento-grid bento-grid-2 gap-12 items-start" style={{ alignItems: 'flex-start' }}>
          {/* Profile Sidebar */}
          <aside className="fade-in-up stagger-1" style={{ position: 'sticky', top: '120px' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div className="mb-8">
                <div className="aspect-square rounded-[var(--radius-md)] bg-[var(--color-canvas-warm)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden mb-6" style={{ maxWidth: '200px', margin: '0 auto 1.5rem' }}>
                  <div className="text-center" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', letterSpacing: '-0.03em', color: 'var(--color-muted)', userSelect: 'none' }}>
                    AJB
                  </div>
                </div>
                <h2 className="h3" style={{ fontFamily: 'var(--font-serif)', textAlign: 'center', marginBottom: '0.25rem' }}>Ajinkya Bawaskar</h2>
                <p className="meta text-center" style={{ fontSize: '14px' }}>Software Engineer</p>
              </div>

              <div className="space-y-4 mb-8">
                <a href="https://github.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] hover:bg-[var(--color-canvas-warm)] transition-colors">
                  <GithubLogoIcon size={18} style={{ color: 'var(--color-muted)' }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: 'var(--color-fg-soft)' }}>@ajinkyabawaskar</span>
                </a>
                <a href="https://linkedin.com/in/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] hover:bg-[var(--color-canvas-warm)] transition-colors">
                  <LinkedinLogoIcon size={18} style={{ color: 'var(--color-muted)' }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: 'var(--color-fg-soft)' }}>ajinkyabawaskar</span>
                </a>
                <a href="/feed.xml" className="flex items-center gap-3 p-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] hover:bg-[var(--color-canvas-warm)] transition-colors">
                  <RssIcon size={18} style={{ color: 'var(--color-muted)' }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: 'var(--color-fg-soft)' }}>RSS Feed</span>
                </a>
              </div>

              <div className="pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="h4 mb-4" style={{ fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px', color: 'var(--color-muted)' }}>Details</h3>
                <dl className="space-y-3 text-sm" style={{ color: 'var(--color-fg-soft)' }}>
                  <div className="flex items-center gap-3">
                    <MapPinIcon size={16} style={{ color: 'var(--color-muted-light)' }} aria-hidden="true" />
                    <dd>Pune, India</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <BriefcaseIcon size={16} style={{ color: 'var(--color-muted-light)' }} aria-hidden="true" />
                    <dd>Full-stack / Backend</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <MailboxIcon size={16} style={{ color: 'var(--color-muted-light)' }} aria-hidden="true" />
                    <dd>ajinkyabawaskar2@gmail.com</dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="fade-in-up stagger-2">
            <div className="article-content prose" style={{ maxWidth: 'none' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {page.content}
              </ReactMarkdown>
            </div>

            <hr className="thick my-12" aria-hidden="true" />

            <section aria-labelledby="connect-heading">
              <h2 id="connect-heading" className="h3 mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Connect</h2>
              <div className="bento-grid bento-grid-3 bento-grid-auto gap-4">
                <Link href="https://github.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="card flex flex-col items-center text-center p-6 hover:border-[var(--color-accent-blue-fg)] transition-colors">
                  <GithubLogoIcon size={28} style={{ color: 'var(--color-fg)', marginBottom: '0.75rem' }} aria-hidden="true" />
                  <h3 className="h4" style={{ fontFamily: 'var(--font-serif)', marginBottom: '0.25rem' }}>GitHub</h3>
                  <p className="meta text-sm">Source code & projects</p>
                </Link>
                <Link href="https://linkedin.com/in/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="card flex flex-col items-center text-center p-6 hover:border-[var(--color-accent-blue-fg)] transition-colors">
                  <LinkedinLogoIcon size={28} style={{ color: 'var(--color-fg)', marginBottom: '0.75rem' }} aria-hidden="true" />
                  <h3 className="h4" style={{ fontFamily: 'var(--font-serif)', marginBottom: '0.25rem' }}>LinkedIn</h3>
                  <p className="meta text-sm">Professional network</p>
                </Link>
                <Link href="/feed.xml" className="card flex flex-col items-center text-center p-6 hover:border-[var(--color-accent-yellow-fg)] transition-colors">
                  <RssIcon size={28} style={{ color: 'var(--color-fg)', marginBottom: '0.75rem' }} aria-hidden="true" />
                  <h3 className="h4" style={{ fontFamily: 'var(--font-serif)', marginBottom: '0.25rem' }}>RSS Feed</h3>
                  <p className="meta text-sm">Subscribe to updates</p>
                </Link>
              </div>
            </section>

            <hr className="thick my-12" aria-hidden="true" />

            <section aria-labelledby="tech-heading">
              <h2 id="tech-heading" className="h3 mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Currently Exploring</h2>
              <div className="flex flex-wrap gap-2">
                <span className="tag tag-blue">Go</span>
                <span className="tag tag-green">Kubernetes</span>
                <span className="tag tag-yellow">Distributed Systems</span>
                <span className="tag tag-red">TypeScript</span>
                <span className="tag tag-blue">PostgreSQL</span>
                <span className="tag tag-green">Observability</span>
              </div>
            </section>

            <hr className="thick my-12" aria-hidden="true" />

            <section aria-labelledby="colophon-heading">
              <h2 id="colophon-heading" className="h3 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Colophon</h2>
              <dl className="space-y-2 text-sm" style={{ color: 'var(--color-fg-soft)', maxWidth: '40ch' }}>
                <div className="flex gap-4">
                  <dt className="meta" style={{ minWidth: '100px', color: 'var(--color-muted)' }}>Engine</dt>
                  <dd>Next.js 15 (App Router)</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="meta" style={{ minWidth: '100px', color: 'var(--color-muted)' }}>Runtime</dt>
                  <dd>React 19 · TypeScript</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="meta" style={{ minWidth: '100px', color: 'var(--color-muted)' }}>Styling</dt>
                  <dd>Tailwind CSS v4 · Custom design system</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="meta" style={{ minWidth: '100px', color: 'var(--color-muted)' }}>Deployment</dt>
                  <dd>GitHub Pages (static export)</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="meta" style={{ minWidth: '100px', color: 'var(--color-muted)' }}>Content</dt>
                  <dd>Markdown · Gray Matter · React Markdown</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="meta" style={{ minWidth: '100px', color: 'var(--color-muted)' }}>Comments</dt>
                  <dd>Utterances (GitHub Issues)</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="meta" style={{ minWidth: '100px', color: 'var(--color-muted)' }}>Analytics</dt>
                  <dd>Google Analytics (GA4)</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="meta" style={{ minWidth: '100px', color: 'var(--color-muted)' }}>Icons</dt>
                  <dd>Inline SVGs</dd>
                </div>
                <div className="flex gap-4">
                  <dt className="meta" style={{ minWidth: '100px', color: 'var(--color-muted)' }}>Fonts</dt>
                  <dd>System UI stack · Geist Mono</dd>
                </div>
              </dl>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}