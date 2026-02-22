import { Icon } from '@iconify/react'
import { Button } from 'components/ui/button'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-xl shadow-lg shadow-primary/30 transition-transform duration-300 primary-gradient group-hover:scale-105">
            <Icon icon="hugeicons:code" className="size-5 text-foreground" />
          </div>
          <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-xl font-bold tracking-tight text-transparent">
            JSONotations
          </span>
        </Link>
        <nav className="hidden items-center gap-10 text-sm font-medium text-muted-foreground md:flex">
          <a
            href="#features"
            className="group relative py-2 transition-colors hover:text-foreground"
          >
            Features
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
          <Link href="/faq" className="group relative py-2 transition-colors hover:text-foreground">
            FAQ
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/help"
            className="group relative py-2 transition-colors hover:text-foreground"
          >
            Help
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/editor">
            <Button className="button-hover-scale shadow-md shadow-primary/10">
              Go to Editor
              <Icon icon="hugeicons:arrow-right-02" className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
