import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Variable",
  description:
    "A web log about programming, software, technology, life and my thoughts in general.",
  authors: [{ name: "Ajinkya Bawaskar" }],
  openGraph: {
    title: "Variable",
    description:
      "A web log about programming, software, technology, life and my thoughts in general.",
    type: "website",
    locale: "en_US",
    siteName: "Variable",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
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
        <link rel="icon" href="/favicon.svg" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Variable RSS Feed"
          href="/feed.xml"
        />
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
      <body
        className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
                {children}
              </div>
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
