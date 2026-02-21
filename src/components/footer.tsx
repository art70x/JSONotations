import { Icon } from '@iconify/react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/40 px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div className="col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg border border-primary/30 shadow-lg shadow-primary/20 primary-gradient">
              <Icon icon="hugeicons:code" className="size-4 text-foreground" />
            </div>
            <span className="text-xl font-black tracking-tight">JSONotations</span>
          </Link>
          <p className="max-w-sm leading-relaxed font-medium text-muted-foreground">
            A premium, client-side toolkit for the modern developer. Your data, your privacy, our
            visualization.
          </p>
        </div>
        <div className="space-y-6">
          <h4 className="text-xs font-black tracking-[0.2em] text-foreground/50 uppercase">
            Product
          </h4>
          <ul className="space-y-4 text-sm font-bold text-muted-foreground">
            <li>
              <Link href="/editor" className="transition-colors hover:text-primary">
                Editor
              </Link>
            </li>
            <li>
              <a href="#features" className="transition-colors hover:text-primary">
                Features
              </a>
            </li>
            <li>
              <Link href="/faq" className="transition-colors hover:text-primary">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="text-xs font-black tracking-[0.2em] text-foreground/50 uppercase">
            Support
          </h4>
          <ul className="space-y-4 text-sm font-bold text-muted-foreground">
            <li>
              <Link href="/help" className="transition-colors hover:text-primary">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="/settings" className="transition-colors hover:text-primary">
                Settings
              </Link>
            </li>
            <li>
              <a href="mailto:art70x@outlook.com" className="transition-colors hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto my-8 flex max-w-7xl items-center justify-center border-t border-border/20 pt-12">
        <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
          &copy; 2026 JSONotations. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
