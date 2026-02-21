import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintPluginUnicorn.configs.recommended,
  eslintPluginBetterTailwindcss.configs.recommended,
  {
    rules: {
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/app/globals.css',
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
