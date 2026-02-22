import { LandingPageClient } from '@/app/landing-page/client'
import { buildSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: 'JSONotations - Advanced Frontend JSON Editor',
    description:
      'The ultimate developer tool for visualizing, editing, and analyzing JSON data entirely in your browser. Fast, secure, and professional.',
    shortDescription:
      'Visualize, edit, and analyze JSON in your browser—fast, secure, and professional.',
    path: '/',
    useTitleTemplate: false,
  })
}

export default function Page() {
  return <LandingPageClient />
}
