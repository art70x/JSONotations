import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHead, UnheadProvider } from '@unhead/react/client'
import '@/main.css'
import { Toaster } from 'components/ui/sonner'
import ThemeProvider from 'components/theme-provider'
import App from '@/app.tsx'
import ErrorBoundary from 'components/common/error-boundary.tsx'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSONotations',
  url: 'https://jso-n.vercel.app/',
  description:
    'The ultimate developer tool for visualizing, editing, and analyzing JSON data entirely in your browser. Fast, secure, and professional.',
  applicationCategory: 'DeveloperTool',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

const head = createHead({
  init: [
    {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s - JSONotations',
      script: [JSON.stringify(structuredData)],
    },
  ],
})

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="app-ui-theme">
      <UnheadProvider head={head}>
        <ErrorBoundary>
          <App />
          <Toaster />
        </ErrorBoundary>
      </UnheadProvider>
    </ThemeProvider>
  </StrictMode>,
)
