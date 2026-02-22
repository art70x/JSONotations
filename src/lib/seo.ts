import type { Metadata } from 'next'

type SeoOptions = {
  title: string
  description: string
  shortDescription?: string
  path?: string
  image?: string
  noIndex?: boolean
  useTitleTemplate?: boolean
}

const siteConfig = {
  name: 'JSONotations',
  url: 'https://jso-n.vercel.app',
  description:
    'The ultimate developer tool for visualizing, editing, and analyzing JSON data entirely in your browser.',
  creator: 'art70x',
  twitter: '@art70x',
  ogImage: '/og.png',
}

export function buildSeo({
  title,
  description,
  shortDescription,
  path = '',
  image,
  noIndex = false,
  useTitleTemplate = true,
}: SeoOptions): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image ?? siteConfig.ogImage
  const finalTitle = useTitleTemplate ? `${title} - ${siteConfig.name}` : title

  // Use shortDescription for social previews if available
  const socialDescription = shortDescription ?? description

  return {
    metadataBase: new URL(siteConfig.url),
    title: finalTitle,
    description,
    applicationName: siteConfig.name,
    authors: [
      {
        name: siteConfig.creator,
        url: 'https://github.com/art70x',
      },
    ],
    creator: siteConfig.creator,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      url,
      title: finalTitle,
      description: socialDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: siteConfig.twitter,
      title: finalTitle,
      description: socialDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}
