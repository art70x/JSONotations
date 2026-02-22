import { EditorPageClient } from '@/app/editor/client'
import { buildSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: 'Editor',
    description:
      'Powerful client-side JSON editor featuring real-time tree view, table view, and diff comparison for effortless editing and analysis.',
    shortDescription: 'Client-side JSON editor with tree, table, and diff views.',
    path: '/editor',
    noIndex: true,
  })
}

export default function Page() {
  return <EditorPageClient />
}
