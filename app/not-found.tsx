import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#666' }}>
        Page not found
      </p>
      <Link href="/" style={{ textDecoration: 'underline' }}>
        ← Back to home
      </Link>
    </div>
  )
}