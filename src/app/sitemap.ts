import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jso-n.vercel.app',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://jso-n.vercel.app/help',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://jso-n.vercel.app/faq',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://jso-n.vercel.app/settings',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
