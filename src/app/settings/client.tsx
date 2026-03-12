'use client'

import { Icon } from '@iconify/react'
import { Switch } from 'components/animate-ui/components/radix/switch'
import { Sidebar } from 'components/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card'
import { Label } from 'components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select'
import { motion } from 'framer-motion'
import type { EditorFontSize, EditorTheme, MonoFont } from 'hooks/use-editor'
import { useEditor } from 'hooks/use-editor'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'

export const SettingsPageClient = () => {
  const { theme, setTheme } = useTheme()

  const { font, setFont, fontSize, setFontSize, editorThemeName, setEditorThemeName } = useEditor()

  /* ========================
     HANDLERS
  ======================== */

  const handleThemeChange = (isDark: boolean) => {
    const newTheme = isDark ? 'dark' : 'light'
    setTheme(newTheme)
    toast.success(`Theme updated to ${newTheme} mode`)
  }

  const handleFontChange = (value: string) => {
    setFont(value as MonoFont)
    toast.success(`Editor font set to ${value}`)
  }

  const handleFontSizeChange = (value: string) => {
    setFontSize(value as EditorFontSize)
    toast.success(`Editor font size set to ${value}`)
  }

  const handleEditorThemeChange = (value: string) => {
    setEditorThemeName(value as EditorTheme)
    toast.success(`Editor theme set to ${value}`)
  }

  /* ========================
     UI
  ======================== */

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar activeTab="settings" setActiveTab={() => {}} />
      <main className="relative flex min-w-0 flex-1 flex-col overflow-auto bg-background shadow-inner">
        <div className="pointer-events-none absolute top-0 left-0 h-96 w-full bg-primary/5 blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-3xl space-y-12 p-8 py-24">
          {/* HEADER */}
          <header className="space-y-6 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl shadow-xl shadow-primary/30 primary-gradient"
            >
              <Icon icon="hugeicons:settings-02" className="size-8 text-foreground" />
            </motion.div>

            <h1 className="text-4xl font-black tracking-tight md:text-6xl">Settings</h1>
            <p className="text-muted-foreground">Tailor your coding environment.</p>
          </header>

          {/* ======================
              APPEARANCE CARD
          ====================== */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-border/50 bg-secondary/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-lg">Appearance</CardTitle>
                <CardDescription>Visual preferences for the workspace.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Dark Mode */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="theme-toggle">Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Switch between light and dark themes.
                    </p>
                  </div>

                  <Switch
                    id="theme-toggle"
                    checked={theme === 'dark'}
                    onCheckedChange={handleThemeChange}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ======================
              EDITOR CARD
          ====================== */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-border/50 bg-secondary/5 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-lg">Editor</CardTitle>
                <CardDescription>Preferences for the editor.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Editor Theme Family */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="editor-theme">Editor Theme</Label>
                    <p className="text-xs text-muted-foreground">
                      Auto switches light/dark based on site theme.
                    </p>
                  </div>

                  <Select value={editorThemeName} onValueChange={handleEditorThemeChange}>
                    <SelectTrigger id="editor-theme" className="w-[200px] bg-background">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="VSCode">VSCode</SelectItem>
                      <SelectItem value="GitHub">GitHub</SelectItem>
                      <SelectItem value="XCode">XCode</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Family */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="font-select">Editor Font Family</Label>
                    <p className="text-xs text-muted-foreground">Choose a monospace typeface.</p>
                  </div>

                  <Select value={font} onValueChange={handleFontChange}>
                    <SelectTrigger id="font-select" className="w-[200px] bg-background">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="IBM Plex Mono">IBM Plex Mono</SelectItem>
                      <SelectItem value="Geist Mono">Geist Mono</SelectItem>
                      <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
                      <SelectItem value="Fira Mono">Fira Mono</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Size */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="font-size-select">Editor Font Size</Label>
                    <p className="text-xs text-muted-foreground">Adjust text size.</p>
                  </div>

                  <Select value={fontSize} onValueChange={handleFontSizeChange}>
                    <SelectTrigger id="font-size-select" className="w-[200px] bg-background">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="base">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
