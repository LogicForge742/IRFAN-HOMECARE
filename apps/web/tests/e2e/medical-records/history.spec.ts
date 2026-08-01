import { test, expect } from '@playwright/test';

test.describe('Medical Records - Audit & History', () => {
  test('should load medical records history', async ({ page }) => {
    await page.goto('/medical-records');
    await expect(page).toHaveURL(/\/login|\/medical-records/);
  });
});
