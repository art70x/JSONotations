import React, { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { useTheme } from 'next-themes';

interface JSONEditorProps {
  value: string;
  onChange: (value: string) => void;
  error: { message: string } | null;
}

export function JSONEditor({ value, onChange, error }: JSONEditorProps) {
  const { theme } = useTheme();

  // Custom theme overrides for the minimalist look
  const editorTheme = useMemo(() => {
    return vscodeDark; // We can customize this further if needed
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col bg-background">
      <CodeMirror
        value={value}
        height="100%"
        theme={editorTheme}
        extensions={[json()]}
        onChange={onChange}
        className="flex-1 text-sm font-mono overflow-auto custom-scrollbar"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          bracketMatching: true,
          foldGutter: true,
          autocompletion: true,
        }}
      />
      {error && (
        <div className="absolute bottom-6 left-6 right-6 bg-destructive/10 border border-destructive/20 p-4 rounded-xl flex items-start gap-3 animate-fade-in backdrop-blur-xl shadow-2xl z-20">
          <div className="w-2 h-2 rounded-full bg-destructive mt-1.5 shrink-0 animate-pulse" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-destructive">Syntax Error</span>
            <p className="text-xs text-foreground/90 font-mono leading-relaxed">
              {error.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
