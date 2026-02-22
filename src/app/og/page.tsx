import { OgImageClient } from '@/app/og/client'
import { buildSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: 'OpenGraph Image',
    description: 'OpenGraph Image Preview',
    noIndex: true,
  })
}

export default function Page() {
  return <OgImageClient />
}
