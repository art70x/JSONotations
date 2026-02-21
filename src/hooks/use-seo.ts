interface Meta {
  title?: string
  description?: string
  shortDescription?: string
  url?: string
  author?: string
}

interface Icons {
  favicon?: string
  icon?: string
  appleTouchIcon?: string
}

interface UseSeoOptions {
  meta?: Meta
  icons?: Icons
  robots?: string
}

export function useSeo({ meta, icons, robots }: UseSeoOptions) {
  const useSeoMeta = {
    title: meta?.title,
    description: meta?.description,

    // Open Graph
    ogTitle: meta?.title,
    ogDescription: meta?.shortDescription ?? meta?.description,
    ogImage: 'https://jso-n.vercel.app/og.png',
    ogImageAlt: 'JSONotations: Advanced Frontend JSON Editor',
    ogImageHeight: 630,
    ogImageWidth: 1200,
    ogType: 'website',
    ogLocale: 'en_US',
    ogUrl: meta?.url,

    // Twitter
    twitterCard: 'summary_large_image',
    twitterTitle: meta?.title,
    twitterDescription: meta?.shortDescription ?? meta?.description,
    twitterImage: 'https://jso-n.vercel.app/og.png',
    twitterImageHeight: 630,
    twitterImageWidth: 1200,
    twitterImageAlt: 'JSONotations: Advanced Frontend JSON Editor',
    twitterCreator: meta?.author ? `@${meta.author}` : undefined,

    // Standard
    author: meta?.author,
    creator: meta?.author,
    robots,
    themeColor: '#00a4e8',
  }

  const useHead = {
    htmlAttrs: {
      lang: 'en',
    },
    link: [
      ...(meta?.url ? [{ rel: 'canonical', href: meta.url }] : []),

      ...(icons?.favicon ? [{ rel: 'shortcut icon', type: 'image/png', href: icons.favicon }] : []),

      ...(icons?.icon ? [{ rel: 'icon', type: 'image/svg+xml', href: icons.icon }] : []),

      ...(icons?.appleTouchIcon
        ? [
            {
              rel: 'apple-touch-icon',
              sizes: '180x180',
              href: icons.appleTouchIcon,
            },
          ]
        : []),
    ],
  }

  return { useSeoMeta, useHead }
}
