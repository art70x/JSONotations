import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from 'components/ui/tooltip'

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: JSONValue }
  | JSONValue[]

interface JSONTreeViewProperties {
  data: JSONValue
  label?: string
  depth?: number
  filter?: string
}

export function JSONTreeView({ data, label, depth = 0, filter = '' }: JSONTreeViewProperties) {
  const isArray = Array.isArray(data)
  const isObject = typeof data === 'object' && data !== null && !isArray
  const isExpandable = isArray || isObject

  /*  Open / Collapse  */
  const defaultOpen = depth < 2 || Boolean(filter)
  const [manualOpen, setManualOpen] = useState(defaultOpen)
  const isOpen = filter.length > 0 ? true : manualOpen

  /*  Filter Logic  */
  const matchesFilter = (key: string, value: JSONValue): boolean => {
    if (!filter) return true

    const lower = filter.toLowerCase()
    if (key.toLowerCase().includes(lower)) return true

    if (typeof value === 'string' && value.toLowerCase().includes(lower)) return true
    if (typeof value === 'number' && String(value).includes(lower)) return true
    if (typeof value === 'boolean' && String(value).includes(lower)) return true

    if (isObject) {
      for (const [k, v] of Object.entries(value as { [key: string]: JSONValue })) {
        if (matchesFilter(k, v)) return true
      }
    }

    if (isArray) {
      for (const item of value as JSONValue[]) {
        if (matchesFilter('', item)) return true
      }
    }

    return false
  }

  const shouldRender = !filter || matchesFilter(label ?? '', data)

  /*  Early return  */
  if (!shouldRender) return null

  /*  Type Label  */
  const getTypeLabel = (): string => {
    if (data === undefined) return 'Undefined'
    if (data === null) return 'Null'
    if (isArray) return `Array (${data.length} items)`
    if (isObject) return `Object (${Object.keys(data).length} keys)`
    return typeof data
  }

  const renderValue = () => {
    if (data === undefined) return <span className="text-muted-foreground">undefined</span>
    if (data === null) return <span className="text-muted-foreground">null</span>
    if (typeof data === 'string') return <span className="text-green-400">"{data}"</span>
    if (typeof data === 'number') return <span className="text-orange-400">{data}</span>
    if (typeof data === 'boolean') return <span className="text-blue-400">{String(data)}</span>
    if (isArray) return <span className="text-muted-foreground">Array({data.length})</span>
    if (isObject)
      return <span className="text-muted-foreground">Object({Object.keys(data).length})</span>
    return null
  }

  /*  Render  */
  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn('select-none', depth > 0 && 'ml-4')}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                'group flex cursor-pointer items-center gap-1.5 rounded-sm px-2 py-0.5 transition-colors hover:bg-secondary/30',
                depth === 0 && 'px-0',
              )}
              onClick={() => isExpandable && setManualOpen((previous) => !previous)}
            >
              {isExpandable ? (
                isOpen ? (
                  <IHugeiconsArrowDown01 className="size-3.5 shrink-0 text-muted-foreground" />
                ) : (
                  <IHugeiconsArrowRight01 className="size-3.5 shrink-0 text-muted-foreground" />
                )
              ) : (
                <div className="w-3.5 shrink-0" />
              )}

              <div className="flex items-center gap-2">
                {label && <span className="text-sm font-medium text-foreground/80">{label}:</span>}
                <span className="text-sm">{renderValue()}</span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="border border-border bg-popover px-2 py-1 text-[10px] font-bold tracking-tight text-foreground uppercase"
          >
            {getTypeLabel()}
          </TooltipContent>
        </Tooltip>

        {isExpandable && isOpen && (
          <div className="mt-0.5 ml-1.5 border-l border-border/50 pl-1">
            {isArray &&
              (data as JSONValue[]).map((item, index) => (
                <JSONTreeView
                  key={index}
                  data={item}
                  label={String(index)}
                  depth={depth + 1}
                  filter={filter}
                />
              ))}
            {isObject &&
              Object.entries(data as { [key: string]: JSONValue }).map(([key, value]) => (
                <JSONTreeView
                  key={key}
                  data={value}
                  label={key}
                  depth={depth + 1}
                  filter={filter}
                />
              ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
