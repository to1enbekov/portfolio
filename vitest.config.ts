import { defineConfig } from 'vitest/config';
export default defineConfig({
  base: '/portfolio/',
  test: { include: ['tests/unit/**/*.test.ts'] },
});
