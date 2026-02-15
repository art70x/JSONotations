import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Code2, 
  GitCompare, 
  Table, 
  Network, 
  Braces, 
  Settings,
  HelpCircle,
  Search,
  MessageCircleQuestion,
  Home,
  FileJson
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const location = useLocation();
  const isEditor = location.pathname === '/editor';

  const items = [
    { id: 'editor', icon: Code2, label: 'Editor', path: '/editor' },
    { id: 'tree', icon: Network, label: 'Tree View', path: '/editor' },
    { id: 'table', icon: Table, label: 'Table View', path: '/editor' },
    { id: 'diff', icon: GitCompare, label: 'Compare', path: '/editor' },
    { id: 'schema', icon: FileJson, label: 'Schema', path: '/editor' },
  ];

  const handleNav = (item: any) => {
    if (item.path === '/editor' && isEditor) {
      setActiveTab(item.id);
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="w-20 xl:w-64 h-full bg-sidebar flex flex-col border-r border-border transition-all duration-300 z-30 relative overflow-hidden">
        {/* Subtle Sidebar Background Glow */}
        <div className="absolute top-0 left-0 w-full h-32 bg-primary/5 blur-[60px] pointer-events-none" />
        
        <Link to="/" className="p-6 flex justify-center xl:justify-start items-center gap-3.5 hover:opacity-80 transition-all group" aria-label="JSONotations Home">
          <div className="w-10 h-10 primary-gradient rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
            <span className="text-[10px] font-black text-white tracking-tighter leading-none">{`{...}`}</span>
          </div>
          <h1 className="text-xl font-black hidden xl:block tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">JSONotations</h1>
        </Link>

        <nav className="flex-1 px-3 py-6 space-y-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to="/"
                className={cn(
                  "w-full flex items-center justify-center xl:justify-start gap-3.5 px-3.5 py-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring button-hover-scale",
                  location.pathname === '/' ? "bg-primary/10 text-primary font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-primary/20" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
                aria-label="Home"
              >
                <Home className="w-5 h-5 shrink-0" />
                <span className="hidden xl:block text-[13px] font-bold">Home</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="xl:hidden font-bold text-[10px] uppercase tracking-wider">
              Home
            </TooltipContent>
          </Tooltip>

          <div className="py-4">
            <div className="h-px bg-border/40 mx-3" />
          </div>

          {items.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <div>
                  {isEditor ? (
                    <button
                      onClick={() => handleNav(item)}
                      className={cn(
                        "w-full flex items-center justify-center xl:justify-start gap-3.5 px-3.5 py-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring button-hover-scale",
                        activeTab === item.id 
                          ? "bg-primary/10 text-primary font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-primary/20" 
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      )}
                      aria-label={item.label}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span className="hidden xl:block text-[13px] font-bold">{item.label}</span>
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={cn(
                        "w-full flex items-center justify-center xl:justify-start gap-3.5 px-3.5 py-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring button-hover-scale",
                        location.pathname === item.path && activeTab === item.id ? "bg-primary/10 text-primary font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-primary/20" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      )}
                      aria-label={item.label}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span className="hidden xl:block text-[13px] font-bold">{item.label}</span>
                    </Link>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="xl:hidden font-bold text-[10px] uppercase tracking-wider">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        <div className="p-4 mb-2 border-t border-border/40 space-y-2 flex flex-col items-center xl:items-stretch">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to="/faq"
                className={cn(
                  "w-full flex items-center justify-center xl:justify-start gap-3.5 px-3.5 py-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring button-hover-scale",
                  location.pathname === '/faq' ? "bg-primary/10 text-primary font-bold shadow-sm border border-primary/20" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
                aria-label="Frequently Asked Questions"
              >
                <MessageCircleQuestion className="w-5 h-5 shrink-0" />
                <span className="hidden xl:block text-[13px] font-bold">FAQ</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="xl:hidden font-bold text-[10px] uppercase tracking-wider">
              FAQ
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to="/help"
                className={cn(
                  "w-full flex items-center justify-center xl:justify-start gap-3.5 px-3.5 py-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring button-hover-scale",
                  location.pathname === '/help' ? "bg-primary/10 text-primary font-bold shadow-sm border border-primary/20" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
                aria-label="Help Center"
              >
                <HelpCircle className="w-5 h-5 shrink-0" />
                <span className="hidden xl:block text-[13px] font-bold">Help</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="xl:hidden font-bold text-[10px] uppercase tracking-wider">
              Help
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to="/settings"
                className={cn(
                  "w-full flex items-center justify-center xl:justify-start gap-3.5 px-3.5 py-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring button-hover-scale",
                  location.pathname === '/settings' ? "bg-primary/10 text-primary font-bold shadow-sm border border-primary/20" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 shrink-0" />
                <span className="hidden xl:block text-[13px] font-bold">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="xl:hidden font-bold text-[10px] uppercase tracking-wider">
              Settings
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
