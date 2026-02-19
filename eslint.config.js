import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintPluginUnicorn.configs.recommended,
      eslintPluginBetterTailwindcss.configs.recommended,
    ],
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/main.css',
      },
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
    },

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
