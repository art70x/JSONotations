import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { JSONEditor } from '@/components/JSONEditor';
import { JSONTreeView } from '@/components/JSONTreeView';
import { JSONTableView } from '@/components/JSONTableView';
import { JSONDiffView } from '@/components/JSONDiffView';
import { JSONSchemaPreview } from '@/components/JSONSchemaPreview';
import { useJSONEditor } from '@/hooks/use-json-editor';
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "@/components/ui/resizable";
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  Download, 
  FileUp, 
  Trash2, 
  AlignLeft, 
  Maximize2,
  RefreshCcw,
  Search,
  ArrowDownToLine,
  CheckCircle2,
  AlertCircle,
  Edit3,
  Network,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import PageMeta from '@/components/common/PageMeta';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState('editor');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{path: string, value: any}[]>([]);
  const [isCopying, setIsCopying] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const { 
    jsonString, 
    setJsonString, 
    parsedData, 
    error, 
    formatJSON, 
    minifyJSON 
  } = useJSONEditor();

  useEffect(() => {
    setIsParsing(true);
    const timer = setTimeout(() => setIsParsing(false), 400);
    return () => clearTimeout(timer);
  }, [jsonString]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setJsonString(content);
        toast.success("File uploaded successfully");
      };
      reader.readAsText(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'application/json': ['.json'] },
    noClick: true 
  });


  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setIsCopying(true);
    toast.success("JSON copied to clipboard");
    setTimeout(() => setIsCopying(false), 2000);
  };

  const handleFormat = () => {
    setIsFormatting(true);
    setTimeout(() => {
      formatJSON();
      setIsFormatting(false);
      toast.info("JSON formatted");
    }, 300);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloading JSON file");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setJsonString(content);
        toast.success("File uploaded successfully");
      };
      reader.readAsText(file);
    }
  };

  const clearContent = () => {
    setJsonString('{}');
    toast.info("Content cleared");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shift+Alt+F to format
      if (e.shiftKey && e.altKey && e.key === 'F') {
        e.preventDefault();
        formatJSON();
        toast.info("JSON formatted");
      }
      // Ctrl+S to download (preventing default browser save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleDownload();
      }
      // Alt + Number to switch tabs
      if (e.altKey && !isNaN(Number(e.key))) {
        const num = Number(e.key);
        const tabs = ['editor', 'tree', 'table', 'diff', 'schema'];
        if (num >= 1 && num <= tabs.length) {
          e.preventDefault();
          setActiveTab(tabs[num - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formatJSON, handleDownload]);

  // Enhanced search logic with operators (AND, OR, quotes)
  useEffect(() => {
    if (!searchQuery || !parsedData) {
      setSearchResults([]);
      return;
    }

    const results: {path: string, value: any}[] = [];
    
    // Parse query into terms
    // Handle quotes for exact phrases
    const quoteRegex = /"([^"]+)"/g;
    const quotes: string[] = [];
    let match;
    let cleanQuery = searchQuery;
    while ((match = quoteRegex.exec(searchQuery)) !== null) {
      quotes.push(match[1].toLowerCase());
      cleanQuery = cleanQuery.replace(match[0], '');
    }

    const otherTerms = cleanQuery.split(/\s+/).filter(t => t && !['and', 'or'].includes(t.toLowerCase())).map(t => t.toLowerCase());
    const operators = cleanQuery.split(/\s+/).filter(t => ['and', 'or'].includes(t.toLowerCase())).map(t => t.toLowerCase());

    const checkMatch = (text: string) => {
      const lowerText = text.toLowerCase();
      
      // If no operators, default to AND behavior for all terms
      if (operators.length === 0) {
        return [...quotes, ...otherTerms].every(term => lowerText.includes(term));
      }

      // Very basic operator handling
      if (operators.includes('or')) {
        return [...quotes, ...otherTerms].some(term => lowerText.includes(term));
      }
      
      return [...quotes, ...otherTerms].every(term => lowerText.includes(term));
    };

    const find = (obj: any, path: string = '') => {
      if (typeof obj === 'object' && obj !== null) {
        Object.entries(obj).forEach(([key, val]) => {
          const currentPath = path ? `${path}.${key}` : key;
          const combinedText = `${key} ${typeof val === 'string' ? val : ''}`;
          if (checkMatch(combinedText)) {
            results.push({ path: currentPath, value: val });
          }
          find(val, currentPath);
        });
      } else if (typeof obj === 'string' || typeof obj === 'number') {
        if (checkMatch(String(obj))) {
          results.push({ path, value: obj });
        }
      }
    };
    find(parsedData);
    setSearchResults(results.slice(0, 50)); // Limit to 50 results
  }, [searchQuery, parsedData]);

  return (
    <div {...getRootProps()} className="flex h-screen w-full bg-background text-foreground overflow-hidden relative font-sans">
      <PageMeta 
        title="Editor - JSONotations" 
        description="Powerful client-side JSON editor with real-time tree view, table view, and diff comparison."
      />
      <input {...getInputProps()} aria-label="JSON File Upload" />
      <AnimatePresence>
        {isDragActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/10 backdrop-blur-sm z-50 flex items-center justify-center border-4 border-dashed border-primary/50 m-4 rounded-xl pointer-events-none"
          >
            <div className="text-center">
              <FileUp className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
              <p className="text-2xl font-bold tracking-tight">Drop JSON file here</p>
              <p className="text-muted-foreground mt-2">Release to upload and parse automatically</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 bg-background">
        <TooltipProvider delayDuration={400}>
          {/* Toolbar */}
          <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-xl z-20 sticky top-0 shadow-sm">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 group button-hover-scale">
                <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
                   <span className="text-[8px] font-black text-white leading-none tracking-tighter">{`{...}`}</span>
                </div>
                <span className="text-sm font-black tracking-tighter hidden xl:inline-block">JSONotations</span>
              </Link>
              <div className="h-4 w-px bg-border/50 hidden xl:block" />
              <div className="flex items-center gap-1.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn("h-9 w-9 text-muted-foreground transition-all duration-300 button-hover-scale rounded-xl", isFormatting && "text-primary bg-primary/10")} 
                      onClick={handleFormat} 
                      aria-label="Format JSON (Shift+Alt+F)"
                    >
                      {isFormatting ? <RefreshCcw className="h-4.5 w-4.5 animate-spin" /> : <AlignLeft className="h-4.5 w-4.5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="font-bold text-[10px] uppercase tracking-wider">Format JSON (Shift+Alt+F)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary transition-all button-hover-scale rounded-xl" onClick={minifyJSON} aria-label="Minify JSON">
                      <Maximize2 className="h-4.5 w-4.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="font-bold text-[10px] uppercase tracking-wider">Minify JSON</TooltipContent>
                </Tooltip>

                <div className="w-px h-4 bg-border/50 mx-1" />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn("h-9 w-9 text-muted-foreground transition-all duration-300 button-hover-scale rounded-xl", isCopying && "text-emerald-400 bg-emerald-400/10")} 
                      onClick={handleCopy} 
                      aria-label="Copy JSON to clipboard"
                    >
                      {isCopying ? <Check className="h-4.5 w-4.5" /> : <Copy className="h-4.5 w-4.5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="font-bold text-[10px] uppercase tracking-wider">{isCopying ? "Copied!" : "Copy All"}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary transition-all button-hover-scale rounded-xl" onClick={handleDownload} aria-label="Download as .json file">
                      <Download className="h-4.5 w-4.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="font-bold text-[10px] uppercase tracking-wider">Download .json (Ctrl+S)</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <label className="cursor-pointer button-hover-scale" aria-label="Upload JSON file">
                      <div className="h-9 w-9 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary/50 transition-all hover:text-primary">
                        <FileUp className="h-4.5 w-4.5" />
                      </div>
                      <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
                    </label>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="font-bold text-[10px] uppercase tracking-wider">Upload File</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-all button-hover-scale rounded-xl" onClick={clearContent} aria-label="Clear all content">
                      <Trash2 className="h-4.5 w-4.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="font-bold text-[10px] uppercase tracking-wider">Clear All</TooltipContent>
                </Tooltip>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden xl:flex items-center group">
                <Search className="absolute left-3.5 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder='Search JSON...' 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-9 py-2 bg-secondary/30 border border-border/50 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 w-48 transition-all focus:w-80 shadow-inner"
                  aria-label="Search through JSON data using AND, OR, and quotes"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                <AnimatePresence>
                  {searchQuery && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 left-0 right-0 bg-popover border border-border rounded-xl shadow-xl overflow-hidden max-h-96 overflow-y-auto custom-scrollbar z-50 p-2 space-y-1"
                    >
                      <div className="px-2 py-1.5 text-[10px] uppercase font-bold text-muted-foreground tracking-widest border-b border-border mb-1">
                        Results ({searchResults.length})
                      </div>
                      {searchResults.length > 0 ? (
                        searchResults.map((res, i) => (
                          <button 
                            key={i} 
                            className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary transition-colors group/item flex items-center justify-between gap-3"
                          >
                            <div className="flex flex-col min-w-0">
                              <span className="text-[10px] font-mono text-primary/70 truncate">{res.path}</span>
                              <span className="text-xs text-foreground/80 truncate">{typeof res.value === 'object' ? '{...}' : String(res.value)}</span>
                            </div>
                            <ArrowDownToLine className="w-3 h-3 text-muted-foreground group-hover/item:text-primary shrink-0" />
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-muted-foreground italic">No matches found</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2 px-2 py-1 bg-secondary/20 rounded-lg border border-border/50 transition-colors">
                {error ? (
                  <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                )}
                <span className="text-[10px] uppercase font-bold tracking-tighter">
                  {error ? 'Invalid' : 'Valid'}
                </span>
              </div>
            </div>
          </header>
        </TooltipProvider>

        {/* Content Area */}
        <div className="flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              {activeTab === 'editor' && (
                <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} minSize={20}>
                  <JSONEditor value={jsonString} onChange={setJsonString} error={error} />
                </ResizablePanel>
                <ResizableHandle className="bg-border hover:bg-primary/40 transition-all w-1 flex items-center justify-center group">
                   <div className="w-1 h-8 bg-border group-hover:bg-primary/60 rounded-full transition-all" />
                </ResizableHandle>
                <ResizablePanel defaultSize={50} minSize={20} className="bg-secondary/5">
                  <div className="h-full flex flex-col">
                    <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between bg-background/50 backdrop-blur-md sticky top-0 z-10">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-primary/10 rounded-lg">
                           <Network className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">Live Structure</span>
                      </div>
                      <RefreshCcw className="w-3.5 h-3.5 text-muted-foreground/50 animate-spin-slow" />
                    </div>
                      <div className="flex-1 overflow-auto p-6 custom-scrollbar">
                        {isParsing ? (
                          <div className="space-y-3">
                            <Skeleton className="h-4 w-[250px] bg-muted" />
                            <Skeleton className="h-4 w-[200px] bg-muted" />
                            <div className="pl-4 space-y-2">
                              <Skeleton className="h-3 w-[150px] bg-muted" />
                              <Skeleton className="h-3 w-[180px] bg-muted" />
                            </div>
                            <Skeleton className="h-4 w-[220px] bg-muted" />
                          </div>
                        ) : parsedData ? (
                          <JSONTreeView data={parsedData} filter={searchQuery} />
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm font-mono opacity-50 space-y-4">
                            <div className="p-4 rounded-full bg-secondary/20 border border-border/50">
                              <Edit3 className="w-8 h-8" />
                            </div>
                            <p>{error ? "Fix errors to see preview" : "Waiting for valid JSON input..."}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              )}

          {activeTab === 'tree' && (
            <div className="h-full overflow-auto p-8 bg-secondary/5 custom-scrollbar">
               {parsedData ? <JSONTreeView data={parsedData} filter={searchQuery} /> : <div className="text-center p-20 text-muted-foreground">Invalid JSON</div>}
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
  );
}
