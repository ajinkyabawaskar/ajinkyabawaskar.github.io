import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import './globals.css'

const GithubLogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M128,24A104,104,0,0,0,24,128a104.09,104.09,0,0,0,31.5,73.5c4.31,6.72,5.71,14.79,3.45,16.79a8.07,8.07,0,0,0,5.3,2.42c6.55,0,10.21-5.14,11.69-10.54,1.1-4.06,1.67-10.26,1.67-14.52,0-7.06-1.29-16.63-3.29-24.49a32.2,32.2,0,0,0-9.16-2.29,33.58,33.58,0,0,1-2.36-15.81c0-7.26,2.39-12.88,7.05-15.63-2.43-.45-10.13-4.33-14.09-9.15a13.25,13.25,0,0,1,6.26-19.38,12.5,12.5,0,0,1,1.89-.1c2.64,0,5.14.36,7.36,1.07a12.67,12.67,0,0,1,4.58,9.08c0,6.62-3.8,12.05-8.66,13.54,3.92,3.15,9.43,5.28,15.83,5.28,18.98,0,30.67-15.4,30.67-34.31,0-18.77-11.59-28.9-24.14-32.99a28.16,28.16,0,0,1-1.58-12.37c0-8.27,3.95-14.15,13.61-17.24l1.45-1.33c5.46-7.67,1.66-21.79-6.85-29.82A93.13,93.13,0,0,0,130.32,24a105.37,105.37,0,0,0-4.17,1.84c-7.59-3.56-17.87-5.6-28.84-5.6-19.43,0-35.38,12.8-40.44,30.33A8,8,0,0,0,40,56a8,8,0,0,0,8,8h104a8,8,0,0,0,8-8,8.13,8.13,0,0,0-2.43-5.86A99.57,99.57,0,0,1,128,24Z"/>
  </svg>
)

const InstagramLogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M216,48H40a24,24,0,0,0-24,24v152a24,24,0,0,0,24,24h176a24,24,0,0,0,24-24V72A24,24,0,0,0,216,48ZM128,208a80,80,0,1,1,80-80A80,80,0,0,1,128,208Zm0-144a64,64,0,1,0,64,64A64,64,0,0,0,128,64Zm72,72a8,8,0,1,1-8-8A8,8,0,0,1,200,136Z"/>
  </svg>
)

const LinkedinLogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M200,32H56a24,24,0,0,0-24,24v168a24,24,0,0,0,24,24h144a24,24,0,0,0,24-24V56A24,24,0,0,0,200,32ZM72,184V88h48v96H72ZM88,72a16,16,0,1,1-16,16A16,16,0,0,1,88,72Zm152,112V88h-48v65.87c0-17.89-6.14-30-22.42-30-14.75,0-22.22,10.4-22.22,23.54V184H112V88h48v16.36c6.46-9.1,19.52-22,44.3-22,37.24,0,54.78,25.73,54.78,60.86Z"/>
  </svg>
)

const RssIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M216,40a16,16,0,0,1,16,16v160a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56a16,16,0,0,1,16-16ZM64,80a24,24,0,1,0,24,24A24,24,0,0,0,64,80Zm0,160a16,16,0,1,1,16-16A16,16,0,0,1,64,240Zm160-80a16,16,0,1,1-16,16A16,16,0,0,1,224,160Z"/>
  </svg>
)

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
              <div>
                <Link href="/" className="site-title" aria-label="Variable Home">
                  Variable
                </Link>
              </div>
              <nav className="nav" role="navigation" aria-label="Main navigation">
                <Link href="/about/" className="nav-link">About</Link>
                <Link href="/categories/" className="nav-link">Categories</Link>
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
                <p className="footer-tagline">A web log about programming, software, technology, life and my thoughts in general.</p>
              </div>
              <div className="footer-links">
                <a href="https://github.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="GitHub">
                  <GithubLogoIcon />
                  GitHub
                </a>
                <a href="https://instagram.com/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Instagram">
                  <InstagramLogoIcon />
                  Instagram
                </a>
                <a href="https://linkedin.com/in/ajinkyabawaskar" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="LinkedIn">
                  <LinkedinLogoIcon />
                  LinkedIn
                </a>
                <a href="/feed.xml" className="footer-link" aria-label="RSS Feed">
                  <RssIcon />
                  RSS Feed
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Ajinkya Bawaskar</span>
              <span>Built with Next.js 15 · Deployed on GitHub Pages</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}