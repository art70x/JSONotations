import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, FileSpreadsheet, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface JSONTableViewProps {
  data: any;
}

export function JSONTableView({ data }: JSONTableViewProps) {
  const [orientation, setOrientation] = React.useState<'p' | 'l'>('p');
  const [includeHeaders, setIncludeHeaders] = React.useState(true);
  const [pageSize, setPageSize] = React.useState<'a4' | 'letter'>('a4');

  const isArrayOfObjects = useMemo(() => {
    return Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && data[0] !== null;
  }, [data]);

  const columns = useMemo(() => {
    if (!isArrayOfObjects) return [];
    const keys = new Set<string>();
    data.forEach((item: any) => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => keys.add(key));
      }
    });
    return Array.from(keys);
  }, [data, isArrayOfObjects]);

  const exportCSV = () => {
    if (!isArrayOfObjects) return;
    
    const headers = columns.join(',');
    const rows = data.map((item: any) => {
      return columns.map(col => {
        const val = item[col];
        const stringVal = typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val ?? '');
        // Escape quotes
        return `"${stringVal.replace(/"/g, '""')}"`;
      }).join(',');
    });
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data_export.csv');
    link.click();
    toast.success("CSV exported successfully");
  };

  const exportPDF = () => {
    if (!isArrayOfObjects) return;
    
    const doc = new jsPDF({
      orientation: orientation,
      format: pageSize
    });

    if (includeHeaders) {
      doc.setFontSize(18);
      doc.text("JSON Data Export", 14, 15);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 22);
    }
    
    const tableRows = data.map((item: any) => {
      return columns.map(col => {
        const val = item[col];
        return typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val ?? '');
      });
    });

    autoTable(doc, {
      head: [columns],
      body: tableRows,
      startY: includeHeaders ? 30 : 10,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [40, 40, 40] },
      margin: { top: 20 },
      didDrawPage: (dataArg) => {
        // Footer
        const str = "Page " + (doc as any).internal.getNumberOfPages();
        doc.setFontSize(8);
        const pageSizeVal = doc.internal.pageSize;
        const pageHeight = pageSizeVal.height ? pageSizeVal.height : pageSizeVal.getHeight();
        doc.text(str, dataArg.settings.margin.left, pageHeight - 10);
      }
    });
    
    doc.save("data_export.pdf");
    toast.success("PDF exported successfully");
  };

  if (!isArrayOfObjects) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
        <Alert className="max-w-md bg-secondary/20 border-border">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Not a tabular structure</AlertTitle>
          <AlertDescription>
            Table view is only available for arrays of objects. Please ensure your JSON is an array (e.g., [ {"{"}"id": 1{"}"}, {"{"}"id": 2{"}"} ]).
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-background">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-secondary/5">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold tracking-tight">Tabular Data</h3>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{data.length} Rows • {columns.length} Columns</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-2" aria-label="Open export settings">
                <Settings className="w-4 h-4" />
                <span className="hidden xl:inline">Export Options</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">PDF Settings</h4>
                <p className="text-sm text-muted-foreground">Customize your PDF export.</p>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="orientation">Orientation</Label>
                  <Select value={orientation} onValueChange={(val: any) => setOrientation(val)}>
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p">Portrait</SelectItem>
                      <SelectItem value="l">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="page-size">Page Size</Label>
                  <Select value={pageSize} onValueChange={(val: any) => setPageSize(val)}>
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="headers">Include Headers</Label>
                  <Switch id="headers" checked={includeHeaders} onCheckedChange={setIncludeHeaders} />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={exportCSV} className="h-8 gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span className="hidden xl:inline">Export CSV</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download as Spreadsheet (.csv)</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={exportPDF} className="h-8 gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden xl:inline">Export PDF</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download as Document (.pdf)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10 border-b border-border shadow-sm">
            <TableRow className="hover:bg-transparent">
              {columns.map(col => (
                <TableHead key={col} className="font-bold text-foreground py-4 px-6 h-auto min-w-[150px]">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any, idx: number) => (
              <TableRow key={idx} className="hover:bg-secondary/20 border-border/50 transition-colors">
                {columns.map(col => (
                  <TableCell key={`${idx}-${col}`} className="py-4 px-6 text-sm text-foreground/80">
                    {typeof item[col] === 'object' && item[col] !== null 
                      ? JSON.stringify(item[col]) 
                      : String(item[col] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
