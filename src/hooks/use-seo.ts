interface Meta {
  title?: string
  description?: string
  shortDescription?: string
  url?: string
  author?: string
}

interface SeoImage {
  url?: string
  alt?: string
  height?: number
  width?: number
}

interface Icons {
  favicon?: string
  icon?: string
  appleTouchIcon?: string
}

interface UseSeoOptions {
  meta?: Meta
  icons?: Icons
  image?: SeoImage
  robots?: string
}

export function useSeo({ meta, icons, image, robots }: UseSeoOptions) {
  useSeoMeta({
    title: meta?.title,
    description: meta?.description,

    // Open Graph
    ogTitle: meta?.title,
    ogDescription: meta?.shortDescription ?? meta?.description,
    ogImage: image?.url,
    ogImageAlt: image?.alt,
    ogImageHeight: image?.height,
    ogImageWidth: image?.width,
    ogType: 'website',
    ogLocale: 'en_US',
    ogUrl: meta?.url,

    // Twitter
    twitterCard: image?.url ? 'summary_large_image' : 'summary',
    twitterTitle: meta?.title,
    twitterDescription: meta?.shortDescription ?? meta?.description,
    twitterImage: image?.url,
    twitterImageAlt: image?.alt,
    twitterCreator: meta?.author ? `@${meta.author}` : undefined,

    // Standard
    author: meta?.author,
    creator: meta?.author,
    robots,
    themeColor: '#00a4e8',
  })

  useHead({
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
  })
}
