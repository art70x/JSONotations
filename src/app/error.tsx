'use client'

import { Icon } from '@iconify/react'
import { Button } from 'components/animate-ui/components/buttons/button'
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
      <div className="mb-8 flex size-20 animate-pulse items-center justify-center rounded-2xl border border-destructive/15 bg-destructive/7.5 shadow-2xl">
        <Icon icon="hugeicons:alert-02" className="size-12 text-destructive" />
      </div>
      <h2 className="mb-4 text-2xl font-black tracking-tighter sm:text-4xl">
        Something went wrong.
      </h2>
      <p className="mx-auto mb-10 max-w-md leading-relaxed font-medium text-muted-foreground">
        An unexpected error occurred in the application. Please try refreshing the page.
      </p>
      <Button
        variant="destructive"
        onClick={reset}
        size="lg"
        className="group h-12 button-hover-scale px-8 font-bold"
      >
        <Icon icon="hugeicons:reload" className="mr-2 size-4 group-hover:animate-spin" />
        Refresh Page
      </Button>
    </div>
  )
}
