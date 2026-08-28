import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPage } from '@/lib/posts'
import { Metadata } from 'next'
import Link from 'next/link'

const GithubLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M128,24A104,104,0,0,0,24,128a104.09,104.09,0,0,0,31.5,73.5c4.31,6.72,5.71,14.79,3.45,16.79a8.07,8.07,0,0,0,5.3,2.42c6.55,0,10.21-5.14,11.69-10.54,1.1-4.06,1.67-10.26,1.67-14.52,0-7.06-1.29-16.63-3.29-24.49a32.2,32.2,0,0,0-9.16-2.29,33.58,33.58,0,0,1-2.36-15.81c0-7.26,2.39-12.88,7.05-15.63-2.43-.45-10.13-4.33-14.09-9.15a13.25,13.25,0,0,1,6.26-19.38,12.5,12.5,0,0,1,1.89-.1c2.64,0,5.14.36,7.36,1.07a12.67,12.67,0,0,1,4.58,9.08c0,6.62-3.8,12.05-8.66,13.54,3.92,3.15,9.43,5.28,15.83,5.28,18.98,0,30.67-15.4,30.67-34.31,0-18.77-11.59-28.9-24.14-32.99a28.16,28.16,0,0,1-1.58-12.37c0-8.27,3.95-14.15,13.61-17.24l1.45-1.33c5.46-7.67,1.66-21.79-6.85-29.82A93.13,93.13,0,0,0,130.32,24a105.37,105.37,0,0,0-4.17,1.84c-7.59-3.56-17.87-5.6-28.84-5.6-19.43,0-35.38,12.8-40.44,30.33A8,8,0,0,0,40,56a8,8,0,0,0,8,8h104a8,8,0,0,0,8-8,8.13,8.13,0,0,0-2.43-5.86A99.57,99.57,0,0,1,128,24Z"/>
  </svg>
)

const LinkedinLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M200,32H56a24,24,0,0,0-24,24v168a24,24,0,0,0,24,24h144a24,24,0,0,0,24-24V56A24,24,0,0,0,200,32ZM72,184V88h48v96H72ZM88,72a16,16,0,1,1-16,16A16,16,0,0,1,88,72Zm152,112V88h-48v65.87c0-17.89-6.14-30-22.42-30-14.75,0-22.22,10.4-22.22,23.54V184H112V88h48v16.36c6.46-9.1,19.52-22,44.3-22,37.24,0,54.78,25.73,54.78,60.86Z"/>
  </svg>
)

const RssIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M216,40a16,16,0,0,1,16,16v160a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56a16,16,0,0,1,16-16ZM64,80a24,24,0,1,0,24,24A24,24,0,0,0,64,80Zm0,160a16,16,0,1,1,16-16A16,16,0,0,1,64,240Zm160-80a16,16,0,1,1-16,16A16,16,0,0,1,224,160Z"/>
  </svg>
)

const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M128,24A104,104,0,0,0,24,128c0,34.55,23.39,63.06,53.05,94.52a8,8,0,0,0,11.9,0C208.61,191.06,232,162.55,232,128A104,104,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/>
  </svg>
)

const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M216,80H176V48a16,16,0,0,0-32,0V80H112V48a16,16,0,0,0-32,0V80H40a24,24,0,0,0-24,24v128a24,24,0,0,0,24,24h176a24,24,0,0,0,24-24V104A24,24,0,0,0,216,80ZM48,104v128a8,8,0,0,0,8,8h160a8,8,0,0,0,8-8V104ZM144,48a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V80H144Z"/>
  </svg>
)

const MailboxIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M216,40H40a24,24,0,0,0-24,24v152a24,24,0,0,0,24,24h176a24,24,0,0,0,24-24V64A24,24,0,0,0,216,40ZM40,64v152h176V64ZM40,179.62l88-59.38L216,179.62V78.38L128,20l-88,58.38Z"/>
  </svg>
)

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
                  <GithubLogoIcon style={{ width: 18, height: 18, color: 'var(--color-muted)' }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: 'var(--color-fg-soft)' }}>@ajinkyabawaskar</span>
                </a>
                <a href="https://linkedin.com/in/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] hover:bg-[var(--color-canvas-warm)] transition-colors">
                  <LinkedinLogoIcon style={{ width: 18, height: 18, color: 'var(--color-muted)' }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: 'var(--color-fg-soft)' }}>ajinkyabawaskar</span>
                </a>
                <a href="/feed.xml" className="flex items-center gap-3 p-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] hover:bg-[var(--color-canvas-warm)] transition-colors">
                  <RssIcon style={{ width: 18, height: 18, color: 'var(--color-muted)' }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: 'var(--color-fg-soft)' }}>RSS Feed</span>
                </a>
              </div>

              <div className="pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="h4 mb-4" style={{ fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px', color: 'var(--color-muted)' }}>Details</h3>
                <dl className="space-y-3 text-sm" style={{ color: 'var(--color-fg-soft)' }}>
                  <div className="flex items-center gap-3">
                    <MapPinIcon style={{ width: 16, height: 16, color: 'var(--color-muted-light)' }} aria-hidden="true" />
                    <dd>Pune, India</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <BriefcaseIcon style={{ width: 16, height: 16, color: 'var(--color-muted-light)' }} aria-hidden="true" />
                    <dd>Full-stack / Backend</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <MailboxIcon style={{ width: 16, height: 16, color: 'var(--color-muted-light)' }} aria-hidden="true" />
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
                  <GithubLogoIcon style={{ width: 28, height: 28, color: 'var(--color-fg)', marginBottom: '0.75rem' }} aria-hidden="true" />
                  <h3 className="h4" style={{ fontFamily: 'var(--font-serif)', marginBottom: '0.25rem' }}>GitHub</h3>
                  <p className="meta text-sm">Source code & projects</p>
                </Link>
                <Link href="https://linkedin.com/in/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="card flex flex-col items-center text-center p-6 hover:border-[var(--color-accent-blue-fg)] transition-colors">
                  <LinkedinLogoIcon style={{ width: 28, height: 28, color: 'var(--color-fg)', marginBottom: '0.75rem' }} aria-hidden="true" />
                  <h3 className="h4" style={{ fontFamily: 'var(--font-serif)', marginBottom: '0.25rem' }}>LinkedIn</h3>
                  <p className="meta text-sm">Professional network</p>
                </Link>
                <Link href="/feed.xml" className="card flex flex-col items-center text-center p-6 hover:border-[var(--color-accent-yellow-fg)] transition-colors">
                  <RssIcon style={{ width: 28, height: 28, color: 'var(--color-fg)', marginBottom: '0.75rem' }} aria-hidden="true" />
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