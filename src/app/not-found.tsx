'use client'

import { Icon } from '@iconify/react'
import { Button } from 'components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  // useSeoMeta({
  //   title: '404 - Page Not Found',
  //   description: 'The page you are looking for does not exist.',
  //   titleTemplate: null,
  // })
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-6 text-foreground">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center"
      >
        <div className="mx-auto mb-8 flex size-24 animate-float items-center justify-center rounded-[2rem] border border-primary/20 bg-primary/10 shadow-2xl">
          <Icon icon="lucide:ghost" className="size-12 text-primary" />
        </div>

        <h1 className="mb-4 bg-linear-to-b from-foreground to-foreground/50 bg-clip-text text-8xl font-black tracking-tighter text-transparent">
          404
        </h1>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Lost in the Data?</h2>
        <p className="mx-auto mb-10 max-w-md leading-relaxed font-medium text-muted-foreground">
          The object you are looking for might have been deleted, moved, or never existed in our
          schema.
        </p>

        <Link href="/">
          <Button
            size="lg"
            className="h-12 button-hover-scale px-8 font-bold shadow-xl shadow-primary/20"
          >
            <Icon icon="hugeicons:arrow-left-02" className="mr-2 size-4" />
            Back to Safety
          </Button>
        </Link>
      </motion.div>

      <p className="absolute bottom-8 text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
        &copy; 2026 JSONotations
      </p>
    </div>
  )
}
