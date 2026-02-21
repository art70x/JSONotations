import './globals.css'

import IntersectObserver from 'components/intersect-observer'
import { ThemeProvider } from 'components/theme-provider'
import { TooltipProvider } from 'components/ui/tooltip'
import { Toaster } from 'sonner'

import type { Metadata } from 'next'
import { Fira_Mono, Geist_Mono, IBM_Plex_Mono, JetBrains_Mono, Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Fira Code', 'Source Code Pro', 'Menlo', 'Consolas'],
  weight: ['400', '500'],
  style: ['normal'],
  variable: '--font-plex-mono',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Fira Code', 'Source Code Pro', 'Menlo', 'Consolas'],
  weight: ['400', '500'],
  style: ['normal'],
  variable: '--font-geist-mono',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Fira Code', 'Source Code Pro', 'Menlo', 'Consolas'],
  weight: ['400', '500'],
  style: ['normal'],
  variable: '--font-jetbrains-mono',
})

const firaMono = Fira_Mono({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Fira Code', 'Source Code Pro', 'Menlo', 'Consolas'],
  weight: ['400', '500'],
  style: ['normal'],
  variable: '--font-fira-mono',
})

export const metadata: Metadata = {
  creator: 'art70x',
  authors: { name: 'art70x', url: 'github.com/art70x' },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  applicationName: 'JSONotations',
  openGraph: {
    images: {
      height: 630,
      width: 1200,
      url: 'https://jso-n.vercel.app/og.png',
      alt: 'JSONotations: Advanced Frontend JSON Editor',
    },
    type: 'website',
    siteName: 'JSONotations',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    images: {
      height: 630,
      width: 1200,
      url: 'https://jso-n.vercel.app/og.png',
      alt: 'JSONotations: Advanced Frontend JSON Editor',
    },
    creator: '@art70x',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${geistMono.variable} ${plexMono.variable} ${jetbrainsMono.variable} ${firaMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <IntersectObserver />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <TooltipProvider delayDuration={300}>
            <div className="flex min-h-screen flex-col">
              <a
                className="sr-only hover:underline focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:bg-foreground focus-visible:px-4 focus-visible:py-3 focus-visible:text-background"
                href="#content"
              >
                Skip to main content
              </a>
              <main id="content" className="flex-1" tabIndex={-1}>
                {children}
              </main>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
