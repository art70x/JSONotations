'use client'

import { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { EditorView } from '@codemirror/view'

interface JSONEditorProperties {
  value: string
  onChange: (value: string) => void
  error: { message: string } | null
}

export function JSONEditor({ value, onChange, error }: JSONEditorProperties) {
  const { editorTheme } = useEditor()

  /* Dynamic Font + Size Theme */

  // Type = Typography
  const textStyles = useMemo(() => {
    return EditorView.theme({
      '&': {
        fontFamily: 'var(--editor-font)',
        fontSize: 'var(--editor-font-size)',
        fontFeatureSettings: "'ss02', 'zero'",
      },
    })
  }, [])

  return (
    <div className="relative flex size-full flex-col bg-background">
      <CodeMirror
        value={value}
        height="100%"
        theme={editorTheme}
        extensions={[json(), textStyles]}
        onChange={onChange}
        className="flex-1 overflow-auto"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          bracketMatching: true,
          foldGutter: true,
          autocompletion: true,
        }}
      />

      {error && (
        <div className="absolute inset-x-6 bottom-6 z-20 flex animate-in items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4 shadow-2xl backdrop-blur-xl fade-in">
          <div className="mt-1.5 size-2.5 shrink-0 animate-pulse rounded-full bg-destructive" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black tracking-widest text-destructive uppercase">
              Syntax Error
            </span>
            <p className="font-mono text-xs/relaxed text-foreground/90">{error.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}
