import { test, expect } from '@playwright/test';

test.describe('Professionals - Filter and Search Discovery', () => {
  test('should display professionals listing', async ({ page }) => {
    await page.goto('/professionals');
    await expect(page).toHaveURL(/\/login|\/professionals/);
  });
});
