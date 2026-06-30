import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

const envFile = process.env.CI ? '.env.test' : '.env.local';
dotenv.config({ path: envFile });

export default defineConfig({
  // Point this to where your .spec.ts files live
  testDir: './tests',

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  use: {
    // 💡 This fixes your invalid URL navigation error!
    baseURL: 'http://localhost:3000',

    // Collect trace when retrying a failed test
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* 💡 This automatically boots your Next.js dev server for tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    env: {
      DATABASE_URL: process.env.DATABASE_URL || '',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || '',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || '',
    },
  },
});
