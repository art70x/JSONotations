import { SettingsPageClient } from '@/app/settings/client'
import { buildSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildSeo({
    title: 'Settings',
    description:
      'Customize your editor’s appearance and typography for a personalized coding experience.',
    shortDescription: 'Set your editor’s look and typography.',
    path: '/settings',
  })
}

export default function Page() {
  return <SettingsPageClient />
}
