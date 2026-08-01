import { test, expect } from '@playwright/test';

test.describe('Authentication - Login Flow', () => {
  test('should display login form and validate credentials inputs', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });
});
