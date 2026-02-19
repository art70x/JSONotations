import { useCallback, useEffect, useMemo, useState } from 'react'

export type JSONPrimitive = string | number | boolean | null

export type JSONValue = JSONPrimitive | { [key: string]: JSONValue } | JSONValue[]

export interface JSONError {
  message: string
  line?: number
  column?: number
}

export function useJSONEditor(
  initialValue: string = JSON.stringify(
    {
      project: 'JSONotations',
      version: '1.0.0',
      status: 'Production Ready',
      metadata: {
        author: 'Art70x',
        license: 'MIT',
        repository: 'https://github.com/art70x/JSONotation',
      },
      features: [
        { id: 1, name: 'Live Tree View', complexity: 'O(n)', interactive: true },
        { id: 2, name: 'Schema Inference', type: 'Automatic', reliable: true },
        { id: 3, name: 'Visual Diff', precision: 'High', side_by_side: true },
        { id: 4, name: 'Spreadsheet View', supports_sorting: true, exportable: true },
      ],
      statistics: {
        latency: '0ms',
        privacy: '100%',
        developers_loved: 9999,
      },
    },
    null,
    2,
  ),
) {
  const [jsonString, setJsonString] = useState<string>(() => {
    if (globalThis.window === undefined) return initialValue
    return localStorage.getItem('json-editor-content') ?? initialValue
  })

  const { parsedData, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonString) as JSONValue

      return {
        parsedData: parsed,
        error: null as JSONError | null,
      }
    } catch (error_: unknown) {
      let message = 'Invalid JSON'
      let line: number | undefined
      let column: number | undefined

      if (error_ instanceof Error) {
        message = error_.message

        const match = error_.message.match(/position (\d+)/)
        const position = match ? Number(match[1]) : undefined

        if (position !== undefined) {
          const lines = jsonString.slice(0, position).split('\n')
          line = lines.length
          column = lines.at(-1)?.length ?? 0
        }
      }

      return {
        parsedData: null,
        error: { message, line, column },
      }
    }
  }, [jsonString])

  useEffect(() => {
    if (globalThis.window === undefined) return
    localStorage.setItem('json-editor-content', jsonString)
  }, [jsonString])

  const formatJSON = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonString)
      setJsonString(JSON.stringify(parsed, null, 2))
    } catch {
      // ignore invalid JSON
    }
  }, [jsonString])

  const minifyJSON = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonString)
      setJsonString(JSON.stringify(parsed))
    } catch {
      // ignore invalid JSON
    }
  }, [jsonString])

  return {
    jsonString,
    setJsonString,
    parsedData, // JSONValue | null
    error,
    formatJSON,
    minifyJSON,
  }
}
