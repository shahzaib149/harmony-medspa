import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/analytics', timeout: 60000, workers: 1,
  use: { baseURL: 'http://localhost:3101', channel: 'chrome', headless: true },
  webServer: {
    command: 'npx next dev --webpack -p 3101', url: 'http://localhost:3101', timeout: 240000,
    env: { NEXT_PUBLIC_GA4_MEASUREMENT_ID: 'G-TEST123', NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID: 'AW-11396978687', NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO: 'AW-11396978687/R0vKCKrFz9kcEP-vwLoq' },
  },
});
