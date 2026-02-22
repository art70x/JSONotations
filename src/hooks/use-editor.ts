import type { Extension } from '@codemirror/state'
import { githubDark, githubLight } from '@uiw/codemirror-theme-github'
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode'
import { xcodeDark, xcodeLight } from '@uiw/codemirror-theme-xcode'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

/* =========================
   THEME TYPES
========================= */

export type EditorTheme = 'VSCode' | 'GitHub' | 'XCode'

const EDITOR_THEME_MAP: Record<EditorTheme, { light: Extension; dark: Extension }> = {
  VSCode: {
    light: vscodeLight,
    dark: vscodeDark,
  },
  GitHub: {
    light: githubLight,
    dark: githubDark,
  },
  XCode: {
    light: xcodeLight,
    dark: xcodeDark,
  },
}

/* =========================
   FONT FAMILY
========================= */

export type MonoFont = 'IBM Plex Mono' | 'Geist Mono' | 'JetBrains Mono' | 'Fira Mono'

const FONT_VARIABLE_MAP: Record<MonoFont, string> = {
  'IBM Plex Mono': 'var(--font-plex-mono)',
  'Geist Mono': 'var(--font-geist-mono)',
  'JetBrains Mono': 'var(--font-jetbrains-mono)',
  'Fira Mono': 'var(--font-fira-mono)',
}

/* =========================
   FONT SIZE (Tailwind)
========================= */

export type EditorFontSize = 'sm' | 'base' | 'lg'

const FONT_SIZE_MAP: Record<EditorFontSize, string> = {
  sm: '0.875rem', // text-sm | 14px
  base: '1rem', // text-base | 16px
  lg: '1.125rem', // text-lg | 18px
}

/* =========================
   HOOK
========================= */

export const useEditor = () => {
  const { theme } = useTheme()

  /* ---------- FONT FAMILY ---------- */

  const [font, setFont] = useState<MonoFont>(() => {
    if (globalThis.window === undefined) return 'IBM Plex Mono'
    return (localStorage.getItem('editor-font-family') as MonoFont) || 'IBM Plex Mono'
  })

  useEffect(() => {
    if (globalThis.window === undefined) return

    document.documentElement.style.setProperty('--editor-font', FONT_VARIABLE_MAP[font])

    localStorage.setItem('editor-font-family', font)
  }, [font])

  /* ---------- FONT SIZE ---------- */

  const [fontSize, setFontSize] = useState<EditorFontSize>(() => {
    if (globalThis.window === undefined) return 'sm'
    return (localStorage.getItem('editor-font-size') as EditorFontSize) || 'sm'
  })

  useEffect(() => {
    if (globalThis.window === undefined) return

    document.documentElement.style.setProperty('--editor-font-size', FONT_SIZE_MAP[fontSize])

    localStorage.setItem('editor-font-size', fontSize)
  }, [fontSize])

  /* ---------- THEME ---------- */

  const [editorThemeName, setEditorThemeName] = useState<EditorTheme>(() => {
    if (globalThis.window === undefined) return 'VSCode'
    return (localStorage.getItem('editor-theme') as EditorTheme) || 'VSCode'
  })

  useEffect(() => {
    if (globalThis.window === undefined) return
    localStorage.setItem('editor-theme', editorThemeName)
  }, [editorThemeName])

  const editorTheme = useMemo<Extension>(() => {
    const family = EDITOR_THEME_MAP[editorThemeName]

    if (theme === 'light') {
      return family.light
    }

    return family.dark
  }, [editorThemeName, theme])

  /* ---------- RETURN ---------- */

  return {
    font,
    setFont,
    fontSize,
    setFontSize,
    editorThemeName,
    setEditorThemeName,
    editorTheme,
  }
}
