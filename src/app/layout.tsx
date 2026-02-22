import './globals.css'

import IntersectObserver from 'components/intersect-observer'
import { ThemeProvider } from 'components/theme-provider'
import { TooltipProvider } from 'components/ui/tooltip'
import { Toaster } from 'sonner'

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

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'JSONotations',
      url: 'https://jso-n.vercel.app/',
      description:
        'The ultimate developer tool for visualizing, editing, and analyzing JSON data entirely in your browser. Fast, secure, and professional.',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
      inLanguage: 'en',
      image: 'https://jso-n.vercel.app/og.png',
      creator: {
        '@type': 'Person',
        name: 'art70x',
        url: 'https://github.com/art70x',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'Organization',
      name: 'JSONotations',
      url: 'https://jso-n.vercel.app/',
      logo: '/logo.svg',
      sameAs: ['https://github.com/art70x', 'https://twitter.com/art70x'],
    },
    {
      '@type': 'Person',
      name: 'art70x',
      url: 'https://github.com/art70x',
      sameAs: ['https://github.com/art70x', 'https://twitter.com/art70x'],
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#00a4e8" />
      </head>
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
