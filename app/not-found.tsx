'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="section" style={{ paddingTop: '4rem', paddingBottom: '4rem', minHeight: '60vh' }}>
      <div className="content-wide" style={{ textAlign: 'center' }}>
        <p className="meta reveal reveal-1" style={{ marginBottom: '1rem', color: 'var(--color-accent)' }}>404 / Not found</p>
        <h1 className="reveal reveal-1" style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(4.5rem, 10vw, 8rem)',
          lineHeight: 0.9,
          letterSpacing: '-0.05em',
          marginBottom: '1rem'
        }}>
          Lost page
        </h1>
        <p className="lead reveal reveal-2" style={{ margin: '0 auto 1.75rem', maxWidth: '40ch', color: 'var(--color-muted)' }}>
          The transmission you are looking for does not exist or has been moved.
        </p>
        <div className="reveal reveal-3" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-accent">Return home</Link>
          <Link href="/categories/" className="btn btn-secondary">Browse archive</Link>
        </div>
        <hr className="thick" style={{ margin: '2.5rem auto 1.25rem', maxWidth: '320px' }} aria-hidden="true" />
        <p className="meta reveal reveal-4">Try the archive or use your browser back button.</p>
      </div>
    </div>
  )
}
