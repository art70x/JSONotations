import LandingPage from '@/pages/landing-page'
import EditorPage from '@/pages/editor-page'
import SettingsPage from '@/pages/settings-page'
import HelpPage from '@/pages/help-page'
import FAQPage from '@/pages/faq-page'
import OgImage from '@/pages/og-image'
import type { ReactNode } from 'react'

interface RouteConfig {
  name: string
  path: string
  element: ReactNode
  visible?: boolean
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <LandingPage />,
  },
  {
    name: 'Editor',
    path: '/editor',
    element: <EditorPage />,
  },
  {
    name: 'Help',
    path: '/help',
    element: <HelpPage />,
  },
  {
    name: 'FAQ',
    path: '/faq',
    element: <FAQPage />,
  },
  {
    name: 'Settings',
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    name: 'OgImage',
    path: '/og',
    element: <OgImage />,
  },
]

export default routes
