import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPage } from '@/lib/posts'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ABOUT',
}

export default function AboutPage() {
  const page = getPage('about')

  if (!page) return <div className="panel" style={{ padding: '48px', textAlign: 'center' }}>ABOUT PAGE NOT FOUND</div>

  return (
    <div style={{ paddingTop: '48px', paddingBottom: '64px' }}>
      <div style={{ marginBottom: '48px' }}>
        <h1 className="h1-xl" style={{ marginBottom: '8px' }}>ABOUT</h1>
        <p className="site-tagline" style={{ maxWidth: '500px' }}>SYSTEM OPERATOR DOCUMENTATION</p>
      </div>

      <hr className="rule rule-thick" />

      <div className="about-grid">
        <div className="about-portrait">
          <div className="about-portrait-frame">
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'repeating-linear-gradient(45deg, var(--border), var(--border) 2px, var(--bg) 2px, var(--bg) 4px)',
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: 'var(--muted)',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}>
              AJINKYA BAWASKAR
            </div>
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <p className="meta" style={{ marginBottom: '4px' }}>SYSTEM OPERATOR</p>
            <p className="meta" style={{ fontSize: '11px', color: 'var(--accent)' }}>UNIT ID: AJINKYABAWASKAR</p>
          </div>
        </div>

        <div className="about-text">
          <div className="article-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {page.content}
            </ReactMarkdown>
          </div>

          <hr className="rule" style={{ margin: '32px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <Link
              href="https://github.com/ajinkyabawaskar"
              target="_blank"
              rel="noopener noreferrer"
              className="panel link-panel"
              style={{ textAlign: 'center', textDecoration: 'none', padding: '24px' }}
            >
              <div className="bracket-accent" style={{ marginBottom: '8px' }}>[ GITHUB ]</div>
              <div className="h1-sm" style={{ fontFamily: "'Archivo Black', sans-serif", color: 'var(--fg)', lineHeight: 1 }}>AJINKYABAWASKAR</div>
              <p className="meta" style={{ marginTop: '8px', marginBottom: 0 }}>SOURCE REPOSITORY</p>
            </Link>
            <Link
              href="https://linkedin.com/in/ajinkyabawaskar"
              target="_blank"
              rel="noopener noreferrer"
              className="panel link-panel"
              style={{ textAlign: 'center', textDecoration: 'none', padding: '24px' }}
            >
              <div className="bracket-accent" style={{ marginBottom: '8px' }}>[ LINKEDIN ]</div>
              <div className="h1-sm" style={{ fontFamily: "'Archivo Black', sans-serif", color: 'var(--fg)', lineHeight: 1 }}>AJINKYABAWASKAR</div>
              <p className="meta" style={{ marginTop: '8px', marginBottom: 0 }}>PROFESSIONAL NETWORK</p>
            </Link>
            <Link
              href="/feed.xml"
              className="panel link-panel"
              style={{ textAlign: 'center', textDecoration: 'none', padding: '24px' }}
            >
              <div className="bracket-accent" style={{ marginBottom: '8px' }}>[ RSS ]</div>
              <div className="h1-sm" style={{ fontFamily: "'Archivo Black', sans-serif", color: 'var(--fg)', lineHeight: 1 }}>FEED.XML</div>
              <p className="meta" style={{ marginTop: '8px', marginBottom: 0 }}>SYNDICATION ENDPOINT</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="marker marker-subtle" style={{ position: 'fixed', bottom: '24px', right: '24px', pointerEvents: 'none', zIndex: 1, userSelect: 'none' }}>ABOUT</div>
    </div>
  )
}