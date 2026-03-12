'use client'

import { Icon } from '@iconify/react'
import { Button } from 'components/animate-ui/components/buttons/button'
import { Footer } from 'components/footer'
import { Header } from 'components/header'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export const LandingPageClient = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])

  const features = [
    {
      title: 'Interactive Tree View',
      description: 'Navigate complex JSON structures with a collapsible, searchable tree view.',
      icon: 'hugeicons:structure-03',
      color: 'text-blue-400',
    },
    {
      title: 'Spreadsheet View',
      description:
        'Convert arrays of objects into a clean, sortable table view for better analysis.',
      icon: 'lucide:table',
      color: 'text-emerald-400',
    },
    {
      title: 'JSON Diff',
      description: 'Compare two JSON sets side by side with highlighted changes.',
      icon: 'lucide:git-compare',
      color: 'text-purple-400',
    },
    {
      title: 'Schema Inference',
      description: 'Automatically generate and preview schema types from your data.',
      icon: 'lucide:code2',
      color: 'text-orange-400',
    },
    {
      title: 'Advanced Search',
      description: 'Powerful search with operators and exact phrase matching.',
      icon: 'hugeicons:search-01',
      color: 'text-cyan-400',
    },
    {
      title: 'Secure & Private',
      description: '100% client-side processing. Your data never leaves your browser.',
      icon: 'hugeicons-shield-01',
      color: 'text-indigo-400',
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
      {/* Dynamic Background Elements */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] left-[-5%] h-[40%] w-[40%] animate-pulse-glow rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute right-[-5%] bottom-[-10%] h-[30%] w-[30%] animate-pulse-glow rounded-full bg-blue-500/5 blur-[100px]"
        />
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-32 pb-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="z-10"
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold tracking-widest text-primary uppercase shadow-inner">
              <Icon icon="hugeicons:sparkles" className="size-3.5" />
              Next-Gen JSON Workspace
            </div>
            <h1 className="mb-8 bg-linear-to-b from-foreground via-foreground to-foreground/60 bg-clip-text title leading-[1.05] text-transparent">
              Data Editing <br />
              <span className="text-primary italic">Reimagined.</span>
            </h1>
            <p className="mx-auto mb-12 max-w-2xl text-lg/relaxed font-medium text-muted-foreground md:text-xl">
              A professional-grade, secure, and intuitive environment built for developers who
              demand better JSON visualization and manipulation.
            </p>
            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Link href="/editor">
                <Button
                  size="lg"
                  className="h-12 button-hover-scale px-8 text-lg shadow-xl shadow-primary/20"
                >
                  Start Building
                  <Icon icon="hugeicons:arrow-right-02" className="ml-2.5 size-6" />
                </Button>
              </Link>
              <a href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 button-hover-scale px-8 text-lg shadow-xl shadow-secondary/20"
                >
                  Explore Features
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Enhanced Editor Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative mt-24 w-full max-w-5xl"
          >
            <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-primary/30 to-blue-500/30 opacity-20 blur-2xl transition-opacity duration-700 group-hover:opacity-40" />
            <div className="relative overflow-hidden rounded-[2rem] p-3 glass-card">
              <div className="relative aspect-16/10 overflow-hidden rounded-2xl bg-background/80">
                <div className="flex h-10 items-center gap-2.5 border-b border-border/50 bg-secondary/80 px-5">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-500/50" />
                    <div className="size-3 rounded-full bg-amber-500/50" />
                    <div className="size-3 rounded-full bg-emerald-500/50" />
                  </div>
                  <div className="mx-auto text-[11px] font-medium tracking-wide text-muted-foreground uppercase opacity-50">
                    jsonotations-editor.v1
                  </div>
                </div>
                <div className="relative size-full">
                  <Image
                    src="/image.jpg"
                    loading="lazy"
                    width={350}
                    height={200}
                    alt="JSONotations Interface Preview"
                    className="size-full object-cover opacity-90 grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />

                  {/* Floating Badge Widgets */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[20%] right-[10%] z-20 flex items-center gap-4 rounded-2xl border-white/5 p-4 shadow-2xl glass-card backdrop-blur-2xl"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl border border-primary/30 shadow-lg shadow-primary/20 primary-gradient">
                      <Icon icon="hugeicons:layers-01" className="size-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-[13px] font-bold">Deep Nesting</div>
                      <div className="text-[10px] tracking-tight text-muted-foreground uppercase">
                        Optimized Tree view
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-[25%] left-[8%] z-20 flex items-center gap-4 rounded-2xl border-white/5 p-4 shadow-2xl glass-card backdrop-blur-2xl"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl border border-success/20 bg-success shadow-lg shadow-emerald-500/20">
                      <Icon icon="lucide:activity" className="size-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-[13px] font-bold">Real-time Diff</div>
                      <div className="text-[10px] tracking-tight text-muted-foreground uppercase">
                        Zero-latency compare
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 border-y border-border/40 bg-linear-to-r from-transparent via-secondary/5 to-transparent py-10 md:grid-cols-4">
          {[
            { label: 'Latency', value: '0ms' },
            { label: 'Security', value: '100%' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Developer Luv', value: '∞' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-1 text-3xl font-black">{stat.value}</div>
              <div className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="space-y-24"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Built for modern workflows.
              </h2>
              <p className="mx-auto max-w-xl text-lg/relaxed font-medium text-muted-foreground">
                Experience the tools that turn data manipulation from a chore into a seamless
                professional experience.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-[1.5rem] p-8 glass-card"
                >
                  <div className="absolute -top-12 -right-12 size-32 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/40" />
                  <div className="mb-8 flex size-14 items-center justify-center rounded-2xl border border-border/50 bg-secondary/50 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon icon={feature.icon} className={`size-7 ${feature.color}`} />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold transition-colors group-hover:text-primary">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed font-medium text-muted-foreground">
                    {feature.description}
                  </p>

                  <div className="mt-8 flex translate-x-[-10px] items-center text-xs font-bold text-primary/0 transition-all group-hover:translate-x-0 group-hover:text-primary">
                    Learn more <Icon icon="hugeicons:arrow-right-02" className="ml-1.5 size-3.5" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] p-12 text-center glass-card md:p-24"
        >
          <div className="absolute top-[-20%] right-[-10%] h-[50%] w-[50%] animate-pulse-glow rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-10%] h-[40%] w-[40%] animate-pulse-glow rounded-full bg-blue-500/10 blur-[100px]" />

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl leading-[1.1] font-black tracking-tight md:text-6xl">
              Ready to elevate your <br /> JSON experience?
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-xl/relaxed font-medium text-muted-foreground/80">
              Join thousands of developers using JSONotations to visualize, edit and validate data
              with confidence.
            </p>
            <Link href="/editor">
              <Button
                size="lg"
                className="h-16 button-hover-scale border-none px-14 text-xl font-black shadow-2xl shadow-primary/30 primary-gradient"
              >
                Try it now — for free
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
