import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IntersectObserver from 'components/common/intersect-observer'
import routes from '@/routes'
import NotFound from '@/pages/not-found'

function App() {
  useSeo({
    meta: { author: 'art70x' },
    icons: { favicon: '/favicon.png', icon: '/icon.svg', appleTouchIcon: '/apple-touch-icon.png' },
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    image: {
      url: 'https://jso-n.vercel.app/og.png',
      alt: 'JSONotations: Advanced Frontend JSON Editor',
      height: 630,
      width: 1200,
    },
  })

  return (
    <Router>
      <IntersectObserver />
      <div className="flex min-h-screen flex-col">
        <a
          className="sr-only hover:underline focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:bg-foreground focus-visible:px-4 focus-visible:py-3 focus-visible:text-background"
          href="#content"
        >
          Skip to main content
        </a>
        <main id="content" className="flex-1" tabIndex={-1}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
