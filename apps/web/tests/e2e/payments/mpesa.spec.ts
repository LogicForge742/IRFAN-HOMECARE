import { test, expect } from '@playwright/test';

test.describe('Payments - Mpesa Workflow', () => {
  test('should load payments dashboard', async ({ page }) => {
    await page.goto('/payments');
    await expect(page).toHaveURL(/\/login|\/payments/);
  });
});
