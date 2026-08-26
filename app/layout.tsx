import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Variable',
  description: 'A web log about programming, software, technology, life and my thoughts in general.',
  authors: [{ name: 'Ajinkya Bawaskar' }],
  openGraph: {
    title: 'Variable',
    description: 'A web log about programming, software, technology, life and my thoughts in general.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Variable',
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="alternate" type="application/rss+xml" title="Variable RSS Feed" href="/feed.xml" />
        <Script
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-143186517-3');
            `,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-143186517-3"
          strategy="lazyOnload"
        />
      </head>
      <body>
        <header style={{ borderBottom: '1px solid #e0e0e0', padding: '1rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#1a1a1a' }}>
            Variable
          </Link>
          <nav style={{ marginTop: '0.5rem' }}>
            <Link href="/about/" style={{ marginRight: '1rem', textDecoration: 'underline' }}>About</Link>
            <Link href="/categories/" style={{ textDecoration: 'underline' }}>Categories</Link>
          </nav>
        </header>
        <main style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
          {children}
        </main>
        <footer style={{ borderTop: '1px solid #e0e0e0', padding: '1rem 2rem', maxWidth: '800px', margin: '2rem auto 0', fontSize: '0.9rem', color: '#666' }}>
          <p>A web log about programming, software, technology, life and my thoughts in general.</p>
          <div style={{ marginTop: '0.5rem' }}>
            <a href="https://github.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" style={{ marginRight: '1rem', textDecoration: 'underline' }}>GitHub</a>
            <a href="https://instagram.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" style={{ marginRight: '1rem', textDecoration: 'underline' }}>Instagram</a>
            <a href="https://linkedin.com/in/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>LinkedIn</a>
          </div>
        </footer>
      </body>
    </html>
  )
}