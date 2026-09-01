import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, RssIcon } from '@/components/Icons'
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
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
        <div className="ambient-glow" aria-hidden="true" />
        <header className="site-header" role="banner">
          <div className="container">
            <div className="header-inner">
              <Link href="/" className="site-title" aria-label="Variable Home">
                Variable
              </Link>
              <nav className="nav" role="navigation" aria-label="Main navigation">
                <Link href="/about/" className="nav-link">About</Link>
                <Link href="/categories/" className="nav-link">Archive</Link>
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
                  Variable
                </Link>
                <p className="footer-tagline">A web log about programming, software, technology, life and my thoughts in general. Written and coded by Ajinkya Bawaskar since 2020.</p>
              </div>
              <div className="footer-links">
                <a href="https://github.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="GitHub">
                  <GithubLogoIcon size={13} />
                  <span>GitHub</span>
                </a>
                <a href="https://instagram.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Instagram">
                  <InstagramLogoIcon size={13} />
                  <span>Instagram</span>
                </a>
                <a href="https://linkedin.com/in/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="LinkedIn">
                  <LinkedinLogoIcon size={13} />
                  <span>LinkedIn</span>
                </a>
                <a href="/feed.xml" className="footer-link" aria-label="RSS Feed">
                  <RssIcon size={13} />
                  <span>RSS</span>
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Ajinkya Bawaskar</span>
              <span>Next.js 15 / GitHub Pages / EB Garamond and Geist</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
