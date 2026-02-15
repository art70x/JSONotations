import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Hash, Type, Braces, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface JSONTreeViewProps {
  data: any;
  label?: string;
  depth?: number;
  isLast?: boolean;
  filter?: string;
}

export function JSONTreeView({ data, label, depth = 0, isLast = true, filter = '' }: JSONTreeViewProps) {
  const [isOpen, setIsOpen] = useState(depth < 2 || !!filter);
  const type = Array.isArray(data) ? 'array' : typeof data;
  const isObject = data !== null && type === 'object';
  const isArray = type === 'array';
  const isExpandable = isObject || isArray;

  // Simple filter logic
  const matchesFilter = (key: string, val: any): boolean => {
    if (!filter) return true;
    if (key.toLowerCase().includes(filter.toLowerCase())) return true;
    if (typeof val === 'string' && val.toLowerCase().includes(filter.toLowerCase())) return true;
    if (typeof val === 'object' && val !== null) {
      return Object.entries(val).some(([k, v]) => matchesFilter(k, v));
    }
    return false;
  };

  const shouldRender = !filter || matchesFilter(label || '', data);

  useEffect(() => {
    if (filter) setIsOpen(true);
  }, [filter]);

  if (!shouldRender) return null;

  const getIcon = () => {
    if (isArray) return <List className="w-3.5 h-3.5 text-blue-400" />;
    if (isObject) return <Braces className="w-3.5 h-3.5 text-purple-400" />;
    if (type === 'number') return <Hash className="w-3.5 h-3.5 text-orange-400" />;
    if (type === 'string') return <Type className="w-3.5 h-3.5 text-green-400" />;
    return null;
  };

  const getTypeLabel = () => {
    if (data === null) return 'Null';
    if (isArray) return `Array (${data.length} items)`;
    if (isObject) return `Object (${Object.keys(data).length} keys)`;
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const renderValue = () => {
    if (data === null) return <span className="text-muted-foreground">null</span>;
    if (type === 'string') return <span className="text-green-400">"{data}"</span>;
    if (type === 'number') return <span className="text-orange-400">{data}</span>;
    if (type === 'boolean') return <span className="text-blue-400">{data.toString()}</span>;
    if (isArray) return <span className="text-muted-foreground">Array({data.length})</span>;
    if (isObject) return <span className="text-muted-foreground">Object({Object.keys(data).length})</span>;
    return null;
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn("select-none", depth > 0 && "ml-4")}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className={cn(
                "flex items-center gap-1.5 py-0.5 px-2 rounded-sm hover:bg-secondary/30 cursor-pointer group transition-colors",
                depth === 0 && "px-0"
              )}
              onClick={() => isExpandable && setIsOpen(!isOpen)}
            >
              {isExpandable ? (
                isOpen ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              ) : (
                <div className="w-3.5 shrink-0" />
              )}
              
              <div className="flex items-center gap-2">
                {getIcon()}
                {label && <span className="text-foreground/80 font-medium text-sm">{label}:</span>}
                <span className="text-sm">{renderValue()}</span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-popover border border-border text-foreground py-1 px-2 text-[10px] uppercase font-bold tracking-tight">
            {getTypeLabel()}
          </TooltipContent>
        </Tooltip>

        {isExpandable && isOpen && (
          <div className="mt-0.5 border-l border-border/50 ml-1.5 pl-1">
            {isArray ? (
              data.map((item: any, index: number) => (
                <JSONTreeView 
                  key={index} 
                  data={item} 
                  label={index.toString()} 
                  depth={depth + 1} 
                  isLast={index === data.length - 1} 
                  filter={filter}
                />
              ))
            ) : (
              Object.entries(data).map(([key, value], index, arr) => (
                <JSONTreeView 
                  key={key} 
                  data={value} 
                  label={key} 
                  depth={depth + 1} 
                  isLast={index === arr.length - 1} 
                  filter={filter}
                />
              ))
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

