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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
        <header>
          <Link href="/">Variable</Link>
          <p>A web log about programming, software, technology, life and my thoughts in general.</p>
          <nav>
            <Link href="/about/">About</Link>
            <Link href="/categories/">Categories</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>A web log about programming, software, technology, life and my thoughts in general.</p>
          <div>
            <a href="https://github.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://instagram.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com/in/ajinkyabawaskar" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </footer>
      </body>
    </html>
  )
}