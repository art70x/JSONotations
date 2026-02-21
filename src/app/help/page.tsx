'use client'

import { Icon } from '@iconify/react'
import { Sidebar } from 'components/sidebar'
import { Card, CardContent } from 'components/ui/card'
import { motion } from 'framer-motion'

export default function HelpPage() {
  // useSeo({
  //   meta: {
  //     title: 'Documentation',
  //     description:
  //       'Master JSONotations with our complete user guide, covering all features and best practices.',
  //     shortDescription: 'Complete guide to using JSONotations effectively.',
  //     url: 'https://jso-n.vercel.app/help',
  //   },
  // })

  const guides = [
    {
      title: 'Getting Started',
      icon: 'hugeicons:zap',
      description: 'Learn the basics of using JSONotations to manage your data.',
      steps: ['Paste your JSON', 'Use Tree View to navigate', 'Format or Minify with one click'],
    },
    {
      title: 'Keyboard Shortcuts',
      icon: 'lucide:code2',
      description: 'Master the editor with powerful keyboard combinations.',
      steps: ['Alt + 1-5: Switch Tabs', 'Shift + Alt + F: Format', 'Ctrl + S: Save/Download'],
    },
    {
      title: 'Advanced Features',
      icon: 'hugeicons:book-open-01',
      description: 'Dive deeper into schema validation and diff comparison.',
      steps: ['Compare two JSON sets', 'Infer and preview schema', 'Export table to CSV/PDF'],
    },
  ]

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar activeTab="help" setActiveTab={() => {}} />
      <main className="relative flex min-w-0 flex-1 flex-col overflow-auto bg-background shadow-inner">
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-full bg-primary/5 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-full bg-blue-500/5 blur-[120px]" />
        <div className="relative z-10 mx-auto w-full max-w-4xl space-y-16 p-8 py-24">
          <header className="space-y-6 text-center">
            <div className="flex size-8 items-center justify-center rounded-lg shadow-lg shadow-primary/30 transition-transform primary-gradient group-hover:scale-105">
              <Icon icon="hugeicons:help-circle" className="size-8 text-foreground" />
            </div>
            <h1 className="bg-linear-to-b from-foreground to-foreground/50 bg-clip-text text-5xl font-black tracking-tighter text-transparent md:text-7xl">
              User Guide.
            </h1>
            <p className="mx-auto max-w-lg text-lg/relaxed font-medium text-muted-foreground">
              Master the most powerful JSON tools in your browser.
            </p>
          </header>

          <div className="grid gap-8">
            {guides.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cursor-default border-border bg-secondary/10 transition-colors hover:bg-secondary/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6 xl:flex-row">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Icon icon={guide.icon} className="size-6 text-primary" />
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-bold">{guide.title}</h2>
                          <p className="text-muted-foreground">{guide.description}</p>
                        </div>
                        <ul className="flex flex-col gap-3">
                          {guide.steps.map((step, sIndex) => (
                            <li
                              key={sIndex}
                              className="flex items-center gap-2 text-sm text-foreground/80"
                            >
                              <div className="size-1.5 rounded-full bg-primary" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <footer className="flex flex-col items-center justify-between gap-6 border-t border-border pt-12 xl:flex-row">
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
              >
                GitHub Repository
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
              >
                Release Notes
              </a>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 JSONotations Team</p>
          </footer>
        </div>
      </main>
    </div>
  )
}
