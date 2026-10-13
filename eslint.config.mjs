import js from '@eslint/js';
import ts from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
export default defineConfig(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      'docs/legacy/**',
      'artifacts/**',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        URL: 'readonly',
        fetch: 'readonly',
        document: 'readonly',
      },
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
        location: 'readonly',
        URL: 'readonly',
        FormData: 'readonly',
        URLSearchParams: 'readonly',
      },
    },
  },
);
