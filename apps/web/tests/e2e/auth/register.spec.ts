import { test, expect } from '@playwright/test';

test.describe('Authentication - Registration Flow', () => {
  test('should display registration form fields', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });
});
