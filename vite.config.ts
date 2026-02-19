import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { hookImports } from '@unhead/react'
import Icons from 'unplugin-icons/vite'
import { fontless } from 'fontless'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },

  plugins: [
    react(),
    AutoImport({
      include: [/\.[tj]sx?$/],
      resolvers: [
        IconsResolver({
          prefix: 'I',
          extension: 'jsx',
        }),
      ],
      imports: ['react', 'react-router-dom', hookImports],
      dirs: ['src/hooks', 'src/lib'],
      dirsScanOptions: {
        filePatterns: ['*.ts'],
        types: true,
      },
      dts: 'src/auto-imports.d.ts',
    }),
    Icons({ autoInstall: true, compiler: 'jsx', jsx: 'react' }),
    fontless({
      defaults: {
        weights: [400, 500, 600, 700, 800],
        styles: ['normal', 'italic'],
        fallbacks: {
          'sans-serif': ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial'],
          monospace: ['Fira Code', 'Source Code Pro', 'Menlo', 'Consolas'],
        },
      },
    }),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      components: fileURLToPath(new URL('src/components', import.meta.url)),
    },
  },
})
