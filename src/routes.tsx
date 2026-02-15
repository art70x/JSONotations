import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import FAQPage from './pages/FAQPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <LandingPage />
  },
  {
    name: 'Editor',
    path: '/editor',
    element: <EditorPage />
  },
  {
    name: 'Settings',
    path: '/settings',
    element: <SettingsPage />
  },
  {
    name: 'Help',
    path: '/help',
    element: <HelpPage />
  },
  {
    name: 'FAQ',
    path: '/faq',
    element: <FAQPage />
  }
];

export default routes;
