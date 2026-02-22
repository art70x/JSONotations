import { FAQPageClient } from '@/app/faq/client'
import { buildSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: 'FAQs',
    description:
      'Comprehensive answers to common questions about our JSON Editor, Tree View, Table View, and other features.',
    shortDescription: 'FAQs for our JSON Editor, Tree View, and Table View.',
    path: '/faq',
  })
}

export default function Page() {
  return <FAQPageClient />
}
