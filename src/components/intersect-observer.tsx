'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Observer } from 'tailwindcss-intersect'

const IntersectObserver = () => {
  const pathname = usePathname()

  useEffect(() => {
    // When the location changes, we need to restart the observer
    // to pick up new elements on the page.
    // We use a small timeout to ensure the DOM has updated.
    const timer = setTimeout(() => {
      Observer.restart()
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}

export default IntersectObserver
