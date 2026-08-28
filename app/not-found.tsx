import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="bracket-accent" style={{ marginBottom: '16px', fontSize: '14px' }}>ERROR 404</div>
      <h1 className="not-found-code">404</h1>
      <p className="not-found-message">TRANSMISSION NOT FOUND<br />TARGET COORDINATES INVALID</p>
      <Link href="/" className="not-found-link">
        RETURN TO BASE
      </Link>
      <div style={{ marginTop: '48px', display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/categories/" className="nav-link">ARCHIVE</Link>
        <Link href="/about/" className="nav-link">ABOUT</Link>
      </div>
    </div>
  )
}