import { HelpPageClient } from '@/app/help/client'
import { buildSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: 'Documentation',
    description:
      'Master JSONotations with our complete user guide, covering all features and best practices.',
    shortDescription: 'Complete guide to using JSONotations effectively.',
    path: '/help',
  })
}

export default function Page() {
  return <HelpPageClient />
}
