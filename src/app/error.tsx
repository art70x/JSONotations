'use client'

import { Icon } from '@iconify/react'
import { Button } from 'components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center text-foreground"
      role="alert"
    >
      <div className="mb-8 flex w-20 h-20 items-center justify-center rounded-2xl border border-destructive/15 bg-destructive/7.5 shadow-2xl animate-pulse">
        <Icon icon="hugeicons:alert-02" className="size-12 text-destructive" />
      </div>
      <h2 className="mb-4 text-2xl sm:text-4xl font-black tracking-tighter">
        Something went wrong.
      </h2>
      <p className="mx-auto mb-10 max-w-md leading-relaxed font-medium text-muted-foreground">
        An unexpected error occurred in the application. Please try refreshing the page.
      </p>
      <Button
        variant="destructive"
        onClick={reset}
        size="lg"
        className="group button-hover-scale h-12 px-8 font-bold"
      >
        <Icon icon="hugeicons:reload" className="size-4 group-hover:animate-spin mr-2" />
        Refresh Page
      </Button>
    </div>
  )
}
