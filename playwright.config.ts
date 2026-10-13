import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  fullyParallel: true,
  workers: 3,
  use: {
    baseURL: 'http://127.0.0.1:4321',
    browserName: 'chromium',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  reporter: [
    ['list'],
    ['json', { outputFile: 'artifacts/playwright-results.json' }],
    ['html', { open: 'never' }],
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://127.0.0.1:4321/portfolio/',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
