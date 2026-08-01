import { test, expect } from '@playwright/test';

test.describe('Admin Panel - Analytics & User Management', () => {
  test('should display admin controls or redirect', async ({ page }) => {
    await page.goto('/admin/analytics');
    await expect(page).toHaveURL(/\/login|\/admin\/analytics/);
  });
});
