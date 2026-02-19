export default function OgImage() {
  useSeo({
    meta: { title: 'OpenGraph Image' },
    robots: 'noindex, nofollow',
  })

  return (
    <div className="grid min-h-dvh place-items-center bg-background">
      <div
        id="og-image"
        className="relative flex h-[630px] w-[1200px] flex-col items-center justify-center gap-6 border border-border p-8 text-center shadow-xl"
      >
        {/* Logo */}
        <div className="flex items-center justify-center rounded-4xl p-4 shadow-xl shadow-primary/30 primary-gradient">
          <IHugeiconsCode className="size-24 text-foreground" />
        </div>

        {/* Title */}
        <h1 className="bg-linear-to-br from-foreground via-foreground to-foreground/40 bg-clip-text px-2 text-center text-8xl leading-[1.05] font-semibold tracking-tight text-transparent max-sm:px-4">
          JSONotations
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-lg/relaxed font-medium text-muted-foreground md:text-xl">
          A professional-grade, secure, and intuitive environment built for developers who demand
          better JSON visualization and manipulation.
        </p>
      </div>
    </div>
  )
}
