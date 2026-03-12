'use client'

import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react'
import { Button } from 'components/animate-ui/components/buttons/button'
import { JSONDiffView } from 'components/json-diff-view'
import { JSONEditor } from 'components/json-editor'
import { JSONSchemaPreview } from 'components/json-schema-preview'
import { JSONTableView } from 'components/json-table-view'
import { JSONTreeView } from 'components/json-tree-view'
import { Sidebar, type SidebarTab } from 'components/sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'components/ui/resizable'
import { Skeleton } from 'components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { useJSONEditor } from 'hooks/use-json-editor'
import {
  AlertCircle,
  AlignLeft,
  ArrowDownToLine,
  CheckCircle2,
  Download,
  Edit3,
  FileUp,
  Maximize2,
  Network,
  RefreshCcw,
  Search,
  Trash2,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

export const EditorPageClient = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('editor')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCopying, setIsCopying] = useState(false)
  const [isFormatting, setIsFormatting] = useState(false)
  const { jsonString, setJsonString, parsedData, error, formatJSON, minifyJSON } = useJSONEditor()

  const debouncedJson = useDebouncedValue(jsonString, 400)
  const isParsing = debouncedJson !== jsonString

  const searchResults = useMemo(() => {
    if (!searchQuery || !parsedData) return []

    const results: { path: string; value: unknown }[] = []

    const quoteRegex = /"([^"]+)"/g
    const quotes: string[] = []
    let match: RegExpExecArray | null
    let cleanQuery = searchQuery

    while ((match = quoteRegex.exec(searchQuery)) !== null) {
      quotes.push(match[1].toLowerCase())
      cleanQuery = cleanQuery.replace(match[0], '')
    }

    const otherTerms = cleanQuery
      .split(/\s+/)
      .filter((t) => t && !['and', 'or'].includes(t.toLowerCase()))
      .map((t) => t.toLowerCase())

    const operators = cleanQuery
      .split(/\s+/)
      .filter((t) => ['and', 'or'].includes(t.toLowerCase()))
      .map((t) => t.toLowerCase())

    const checkMatch = (text: string) => {
      const lowerText = text.toLowerCase()

      if (operators.length === 0) {
        return [...quotes, ...otherTerms].every((term) => lowerText.includes(term))
      }

      if (operators.includes('or')) {
        return [...quotes, ...otherTerms].some((term) => lowerText.includes(term))
      }

      return [...quotes, ...otherTerms].every((term) => lowerText.includes(term))
    }

    const find = (object: unknown, path = '') => {
      if (typeof object === 'object' && object !== null) {
        for (const [key, value] of Object.entries(object)) {
          const currentPath = path ? `${path}.${key}` : key
          const combinedText = `${key} ${typeof value === 'string' ? value : ''}`

          if (checkMatch(combinedText)) {
            results.push({ path: currentPath, value })
          }

          find(value, currentPath)
        }
      } else if (
        (typeof object === 'string' || typeof object === 'number') &&
        checkMatch(String(object))
      ) {
        results.push({ path, value: object })
      }
    }

    find(parsedData)

    return results.slice(0, 50)
  }, [searchQuery, parsedData])

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles.at(0)
    if (!file) return

    try {
      const content: string = await file.text()
      setJsonString(content)
      toast.success('File uploaded successfully')
    } catch (error_: unknown) {
      console.error(error_)
      toast.error('Failed to read file')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/json': ['.json'] },
    noClick: true,
  })

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
    setIsCopying(true)
    toast.success('JSON copied to clipboard')
    setTimeout(() => setIsCopying(false), 2000)
  }

  const handleFormat = () => {
    setIsFormatting(true)
    setTimeout(() => {
      formatJSON()
      setIsFormatting(false)
      toast.info('JSON formatted')
    }, 300)
  }

  const handleDownload = useCallback(() => {
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'data.json'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloading JSON file')
  }, [jsonString])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const content: string = await file.text()
      setJsonString(content)
      toast.success('File uploaded successfully')
    } catch (error_: unknown) {
      console.error(error_)
      toast.error('Failed to read file')
    }
  }
  const clearContent = () => {
    setJsonString('{}')
    toast.info('Content cleared')
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Shift+Alt+F to format
      if (event.shiftKey && event.altKey && event.key === 'F') {
        event.preventDefault()
        formatJSON()
        toast.info('JSON formatted')
      }
      // Ctrl+S to download (preventing default browser save)
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        handleDownload()
      }
      // Alt + Number to switch tabs
      if (event.altKey && !Number.isNaN(Number(event.key))) {
        const number_ = Number(event.key)
        const tabs = ['editor', 'tree', 'table', 'diff', 'schema'] as const
        if (number_ >= 1 && number_ <= tabs.length) {
          event.preventDefault()
          setActiveTab(tabs[number_ - 1])
        }
      }
    }

    globalThis.addEventListener('keydown', handleKeyDown)
    return () => globalThis.removeEventListener('keydown', handleKeyDown)
  }, [formatJSON, handleDownload])

  return (
    <div
      {...getRootProps()}
      className="relative flex h-screen w-full overflow-hidden bg-background font-sans text-foreground"
    >
      <input {...getInputProps()} aria-label="JSON File Upload" />
      <AnimatePresence>
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-50 m-4 flex items-center justify-center rounded-xl border-4 border-dashed border-primary/50 bg-primary/10 backdrop-blur-sm"
          >
            <div className="text-center">
              <FileUp className="mx-auto mb-4 size-16 animate-bounce text-primary" />
              <p className="text-2xl font-bold tracking-tight">Drop JSON file here</p>
              <p className="mt-2 text-muted-foreground">
                Release to upload and parse automatically
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="relative z-10 flex min-w-0 flex-1 flex-col bg-background shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Toolbar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/80 px-6 shadow-sm backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="hidden h-4 w-px bg-border/50 xl:block" />
            <div className="flex items-center gap-1.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'size-9 button-hover-scale rounded-xl text-muted-foreground transition-all duration-300',
                      isFormatting && 'bg-primary/10 text-primary',
                    )}
                    onClick={handleFormat}
                    aria-label="Format JSON (Shift+Alt+F)"
                  >
                    {isFormatting ? (
                      <RefreshCcw className="h-4.5 w-4.5 animate-spin" />
                    ) : (
                      <AlignLeft className="h-4.5 w-4.5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="text-[10px] font-bold tracking-wider uppercase"
                >
                  Format JSON (Shift+Alt+F)
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 button-hover-scale rounded-xl text-muted-foreground transition-all hover:text-primary"
                    onClick={minifyJSON}
                    aria-label="Minify JSON"
                  >
                    <Maximize2 className="h-4.5 w-4.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="text-[10px] font-bold tracking-wider uppercase"
                >
                  Minify JSON
                </TooltipContent>
              </Tooltip>

              <div className="mx-1 h-4 w-px bg-border/50" />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'size-9 button-hover-scale rounded-xl text-muted-foreground transition-all duration-300',
                      isCopying && 'bg-emerald-400/10 text-emerald-400',
                    )}
                    onClick={handleCopy}
                    aria-label="Copy JSON to clipboard"
                  >
                    {isCopying ? (
                      <Icon icon="hugeicons:tick-02" className="h-4.5 w-4.5" />
                    ) : (
                      <Icon icon="hugeicons:copy-01" className="h-4.5 w-4.5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="text-[10px] font-bold tracking-wider uppercase"
                >
                  {isCopying ? 'Copied!' : 'Copy All'}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 button-hover-scale rounded-xl text-muted-foreground transition-all hover:text-primary"
                    onClick={handleDownload}
                    aria-label="Download as .json file"
                  >
                    <Download className="h-4.5 w-4.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="text-[10px] font-bold tracking-wider uppercase"
                >
                  Download .json (Ctrl+S)
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <label
                    className="button-hover-scale cursor-pointer"
                    aria-label="Upload JSON file"
                  >
                    <div className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-secondary/50 hover:text-primary">
                      <FileUp className="h-4.5 w-4.5" />
                    </div>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="text-[10px] font-bold tracking-wider uppercase"
                >
                  Upload File
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 button-hover-scale rounded-xl text-destructive/70 transition-all hover:bg-destructive/10 hover:text-destructive"
                    onClick={clearContent}
                    aria-label="Clear all content"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="text-[10px] font-bold tracking-wider uppercase"
                >
                  Clear All
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="group relative hidden items-center xl:flex">
              <Search className="absolute left-3.5 size-3.5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Search JSON..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-48 rounded-xl border border-border/50 bg-secondary/30 px-9 py-2 text-xs font-medium shadow-inner transition-all focus:w-80 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                aria-label="Search through JSON data using AND, OR, and quotes"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Clear search"
                >
                  <Trash2 className="size-3" />
                </button>
              )}
              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-x-0 top-full z-50 mt-2 max-h-96 space-y-1 overflow-hidden overflow-y-auto rounded-xl border border-border bg-popover p-2 shadow-xl"
                  >
                    <div className="mb-1 border-b border-border px-2 py-1.5 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                      Results ({searchResults.length})
                    </div>
                    {searchResults.length > 0 ? (
                      searchResults.map((result, index) => (
                        <button
                          key={index}
                          className="group/item flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-secondary"
                        >
                          <div className="flex min-w-0 flex-col">
                            <span className="truncate font-mono text-[10px] text-primary/70">
                              {result.path}
                            </span>
                            <span className="truncate text-xs text-foreground/80">
                              {typeof result.value === 'object' ? '{...}' : String(result.value)}
                            </span>
                          </div>
                          <ArrowDownToLine className="size-3 shrink-0 text-muted-foreground group-hover/item:text-primary" />
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-muted-foreground italic">
                        No matches found
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-secondary/20 px-2 py-1 transition-colors">
              {error ? (
                <AlertCircle className="size-3.5 text-destructive" />
              ) : (
                <CheckCircle2 className="size-3.5 text-success" />
              )}
              <span className="text-[10px] font-bold tracking-tighter uppercase">
                {error ? 'Invalid' : 'Valid'}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="h-full"
            >
              {activeTab === 'editor' && (
                <ResizablePanelGroup dir="horizontal">
                  <ResizablePanel defaultSize={50} minSize={20}>
                    <JSONEditor value={jsonString} onChange={setJsonString} error={error} />
                  </ResizablePanel>
                  <ResizableHandle className="group flex w-1 items-center justify-center bg-border transition-all hover:bg-primary/40">
                    <div className="h-8 w-1 rounded-full bg-border transition-all group-hover:bg-primary/60" />
                  </ResizableHandle>
                  <ResizablePanel defaultSize={50} minSize={20} className="bg-secondary/5">
                    <div className="flex h-full flex-col">
                      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/40 bg-background/50 px-6 py-4 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-primary/10 p-1.5">
                            <Network className="size-3.5 text-primary" />
                          </div>
                          <span className="text-[10px] font-black tracking-[0.15em] text-muted-foreground uppercase">
                            Live Structure
                          </span>
                        </div>
                        <RefreshCcw className="size-3.5 animate-spin-slow text-muted-foreground/50" />
                      </div>
                      <div className="flex-1 overflow-auto p-6">
                        {isParsing ? (
                          <div className="space-y-3">
                            <Skeleton className="h-4 w-[250px] bg-muted" />
                            <Skeleton className="h-4 w-[200px] bg-muted" />
                            <div className="space-y-2 pl-4">
                              <Skeleton className="h-3 w-[150px] bg-muted" />
                              <Skeleton className="h-3 w-[180px] bg-muted" />
                            </div>
                            <Skeleton className="h-4 w-[220px] bg-muted" />
                          </div>
                        ) : parsedData ? (
                          <JSONTreeView data={parsedData} filter={searchQuery} />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center space-y-4 font-mono text-sm text-muted-foreground opacity-50">
                            <div className="rounded-full border border-border/50 bg-secondary/20 p-4">
                              <Edit3 className="size-8" />
                            </div>
                            <p>
                              {error
                                ? 'Fix errors to see preview'
                                : 'Waiting for valid JSON input...'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              )}

              {activeTab === 'tree' && (
                <div className="h-full overflow-auto bg-secondary/5 p-8">
                  {parsedData ? (
                    <JSONTreeView data={parsedData} filter={searchQuery} />
                  ) : (
                    <div className="p-20 text-center text-muted-foreground">Invalid JSON</div>
                  )}
                </div>
              )}

              {activeTab === 'table' && (
                <div className="h-full">
                  <JSONTableView data={parsedData} />
                </div>
              )}

              {activeTab === 'diff' && (
                <div className="h-full">
                  <JSONDiffView currentJson={jsonString} />
                </div>
              )}

              {activeTab === 'schema' && (
                <div className="h-full">
                  <JSONSchemaPreview data={parsedData} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
