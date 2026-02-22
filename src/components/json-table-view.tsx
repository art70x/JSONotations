import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert'
import { Button } from 'components/ui/button'
import { Label } from 'components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select'
import { Switch } from 'components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

/* TYPES */

type JSONRow = Record<string, unknown>

interface JSONTableViewProperties {
  data: unknown
}

/* TYPE GUARD (MUST BE OUTSIDE COMPONENT) */

function isJSONRowArray(value: unknown): value is JSONRow[] {
  if (!Array.isArray(value) || value.length === 0) {
    return false
  }

  for (const item of value) {
    if (typeof item !== 'object' || item === null || Array.isArray(item)) {
      return false
    }
  }

  return true
}

/* COMPONENT */

export function JSONTableView({ data }: JSONTableViewProperties) {
  const [orientation, setOrientation] = useState<'p' | 'l'>('p')
  const [includeHeaders, setIncludeHeaders] = useState(true)
  const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4')

  /* TYPE NARROWING */

  const validData = useMemo(() => {
    return isJSONRowArray(data) ? data : null
  }, [data])

  /* COLUMN EXTRACTION */

  const columns = useMemo(() => {
    if (!validData) return []

    const keys = new Set<string>()

    for (const item of validData) {
      for (const key of Object.keys(item)) {
        keys.add(key)
      }
    }

    return [...keys]
  }, [validData])

  /* CSV EXPORT */

  const exportCSV = () => {
    if (!validData) return

    const headers = columns.join(',')

    const rows = validData.map((item) =>
      columns
        .map((col) => {
          const value = item[col]

          const stringValue =
            typeof value === 'object' && value !== null
              ? JSON.stringify(value)
              : String(value ?? null)

          return `"${stringValue.replaceAll('"', '""')}"`
        })
        .join(','),
    )

    const csvContent = [headers, ...rows].join('\n')

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'data_export.csv'
    link.click()

    toast.success('CSV exported successfully')
  }

  /* PDF EXPORT */

  const exportPDF = () => {
    if (!validData) return

    const document_ = new jsPDF({
      orientation,
      format: pageSize,
    })

    if (includeHeaders) {
      document_.setFontSize(18)
      document_.text('JSON Data Export', 14, 15)

      document_.setFontSize(10)
      document_.setTextColor(100)
      document_.text(`Generated on ${new Date().toLocaleString()}`, 14, 22)
    }

    const tableRows = validData.map((item) =>
      columns.map((col) => {
        const value = item[col]

        return typeof value === 'object' && value !== null
          ? JSON.stringify(value)
          : String(value ?? null)
      }),
    )

    autoTable(document_, {
      head: [columns],
      body: tableRows,
      startY: includeHeaders ? 30 : 10,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [40, 40, 40] },
      margin: { top: 20 },
      didDrawPage: () => {
        const pageCount = document_.getNumberOfPages()

        const pageSizeValue = document_.internal.pageSize

        const pageHeight = pageSizeValue.height || pageSizeValue.getHeight()

        document_.setFontSize(8)
        document_.text(`Page ${pageCount}`, 14, pageHeight - 10)
      },
    })

    document_.save('data_export.pdf')

    toast.success('PDF exported successfully')
  }

  /* EMPTY STATE */

  if (!validData) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
        <Alert className="max-w-md border-border bg-secondary/20">
          <AlertTitle>Not a tabular structure</AlertTitle>
          <AlertDescription>Table view is only available for arrays of objects.</AlertDescription>
        </Alert>
      </div>
    )
  }

  /* RENDER */

  return (
    <div className="flex size-full flex-col overflow-hidden bg-background">
      <div className="flex items-center justify-between border-b border-border bg-secondary/5 px-6 py-4">
        <div>
          <h3 className="text-sm font-bold tracking-tight">Tabular Data</h3>
          <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
            {validData.length} Rows • {columns.length} Columns
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Export Options
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 space-y-4 p-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label>Orientation</Label>
                  <Select
                    value={orientation}
                    onValueChange={(value: 'p' | 'l') => setOrientation(value)}
                  >
                    <SelectTrigger className="h-8 w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p">Portrait</SelectItem>
                      <SelectItem value="l">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Page Size</Label>
                  <Select
                    value={pageSize}
                    onValueChange={(value: 'a4' | 'letter') => setPageSize(value)}
                  >
                    <SelectTrigger className="h-8 w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Include Headers</Label>
                  <Switch checked={includeHeaders} onCheckedChange={setIncludeHeaders} />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm" onClick={exportCSV}>
            Export CSV
          </Button>

          <Button variant="outline" size="sm" onClick={exportPDF}>
            Export PDF
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {validData.map((item, index) => (
              <TableRow key={index}>
                {columns.map((col) => (
                  <TableCell key={`${index}-${col}`}>
                    {typeof item[col] === 'object' && item[col] !== null
                      ? JSON.stringify(item[col])
                      : String(item[col] ?? null)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
