import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip'
import type { ComponentType } from 'react'

/* NAV CONFIG  */

const items = [
  { id: 'editor', icon: ILucideCode2, label: 'Editor', path: '/editor' },
  { id: 'tree', icon: IHugeiconsStructure03, label: 'Tree View', path: '/editor' },
  { id: 'table', icon: ILucideTable, label: 'Table View', path: '/editor' },
  { id: 'diff', icon: ILucideGitCompare, label: 'Compare', path: '/editor' },
  { id: 'schema', icon: ILucideFileJson, label: 'Schema', path: '/editor' },
  { id: 'faq', icon: IHugeiconsMessageQuestion, label: 'FAQ', path: '/faq' },
  { id: 'help', icon: IHugeiconsHelpCircle, label: 'Help', path: '/help' },
  { id: 'settings', icon: IHugeiconsSettings02, label: 'Settings', path: '/settings' },
] as const satisfies ReadonlyArray<{
  id: string
  label: string
  path: string
  icon: ComponentType<{ className?: string }>
}>

type NavItem = (typeof items)[number]
export type SidebarTab = NavItem['id']

interface SidebarProperties {
  activeTab: SidebarTab
  setActiveTab: (tab: SidebarTab) => void
}

/* COMPONENT  */

export function Sidebar({ activeTab, setActiveTab }: SidebarProperties) {
  const location = useLocation()
  const navigate = useNavigate()

  const isEditorPage = location.pathname === '/editor'

  const handleNav = (item: NavItem) => {
    if (item.path === '/editor') {
      setActiveTab(item.id)
      if (!isEditorPage) {
        navigate('/editor')
      }
    }
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="relative z-30 flex h-full w-20 flex-col overflow-hidden border-r border-border bg-sidebar transition-all duration-300 xl:w-64">
        {/* Background glow */}
        <div className="pointer-events-none absolute top-0 left-0 h-32 w-full bg-primary/5 blur-[60px]" />

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center justify-center gap-3.5 p-6 transition-all hover:opacity-80 xl:justify-start"
          aria-label="JSONotations Home"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl shadow-lg shadow-primary/30 transition-transform duration-300 primary-gradient group-hover:scale-110">
            <IHugeiconsCode className="size-5 text-foreground" />
          </div>
          <h1 className="hidden bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-xl font-black tracking-tighter text-transparent xl:block">
            JSONotations
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-3 py-6">
          {items.map((item) => {
            const isTabActive = activeTab === item.id
            const isPathActive = location.pathname === item.path

            // Special condition for highlighting:
            // Highlight if the path matches AND (if it's an editor path, the tab must match)
            const isActive = item.path === '/editor' ? isPathActive && isTabActive : isPathActive

            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  {item.path === '/editor' ? (
                    // Button behavior for Editor tabs
                    <button
                      type="button"
                      onClick={() => handleNav(item)}
                      className={cn(
                        'flex w-full items-center justify-center gap-3.5 rounded-xl px-3.5 py-3 transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none xl:justify-start',
                        isActive
                          ? 'border border-primary/20 bg-primary/10 font-bold text-primary'
                          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
                      )}
                    >
                      <item.icon className="size-5 shrink-0" />
                      <span className="hidden text-[13px] font-bold xl:block">{item.label}</span>
                    </button>
                  ) : (
                    // Link behavior for static pages (Settings, FAQ, etc.)
                    <Link
                      to={item.path}
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        'flex w-full items-center justify-center gap-3.5 rounded-xl px-3.5 py-3 transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none xl:justify-start',
                        isActive
                          ? 'border border-primary/20 bg-primary/10 font-bold text-primary'
                          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
                      )}
                    >
                      <item.icon className="size-5 shrink-0" />
                      <span className="hidden text-[13px] font-bold xl:block">{item.label}</span>
                    </Link>
                  )}
                </TooltipTrigger>
                <TooltipContent side="right" className="text-[10px] font-bold uppercase xl:hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </nav>
      </div>
    </TooltipProvider>
  )
}
