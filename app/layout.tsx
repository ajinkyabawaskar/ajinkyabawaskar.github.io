import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import './globals.css'

export const metadata: Metadata = {
  title: 'VARIABLE',
  description: 'A WEB LOG ABOUT PROGRAMMING, SOFTWARE, TECHNOLOGY, LIFE AND MY THOUGHTS IN GENERAL.',
  authors: [{ name: 'AJINKYA BAWASKAR' }],
  openGraph: {
    title: 'VARIABLE',
    description: 'A WEB LOG ABOUT PROGRAMMING, SOFTWARE, TECHNOLOGY, LIFE AND MY THOUGHTS IN GENERAL.',
    type: 'website',
    locale: 'en_US',
    siteName: 'VARIABLE',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="alternate" type="application/rss+xml" title="VARIABLE RSS FEED" href="/feed.xml" />
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
        <header className="site-header" role="banner">
          <div className="container">
            <div className="header-inner">
              <div>
                <Link href="/" className="site-title" aria-label="Variable Home">
                  VARIABLE
                </Link>
                <p className="site-tagline">A WEB LOG ABOUT PROGRAMMING, SOFTWARE, TECHNOLOGY, LIFE AND MY THOUGHTS IN GENERAL</p>
              </div>
              <nav className="nav" role="navigation" aria-label="Main navigation">
                <Link href="/about/" className="nav-link">ABOUT</Link>
                <span className="nav-divider" aria-hidden="true"></span>
                <Link href="/categories/" className="nav-link">CATEGORIES</Link>
                <span className="nav-divider" aria-hidden="true"></span>
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>
        <main id="main-content" role="main">
          <div className="container">
            {children}
          </div>
        </main>
        <footer className="site-footer" role="contentinfo">
          <div className="container">
            <div className="footer-inner">
              <div className="footer-brand">
                <Link href="/" className="site-title" aria-label="Variable Home">
                  VARIABLE
                </Link>
                <p className="footer-tagline">A WEB LOG ABOUT PROGRAMMING, SOFTWARE, TECHNOLOGY, LIFE AND MY THOUGHTS IN GENERAL</p>
              </div>
              <div className="footer-links">
                <a href="https://github.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="footer-link">
                  GITHUB
                </a>
                <a href="https://instagram.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="footer-link">
                  INSTAGRAM
                </a>
                <a href="https://linkedin.com/in/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="footer-link">
                  LINKEDIN
                </a>
                <a href="/feed.xml" className="footer-link">
                  RSS FEED
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} AJINKYA BAWASKAR</span>
              <span>BUILT WITH NEXT.JS 15 · DEPLOYED ON GITHUB PAGES</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}