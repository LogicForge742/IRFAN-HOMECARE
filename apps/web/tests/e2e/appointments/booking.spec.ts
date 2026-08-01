import { test, expect } from '@playwright/test';

test.describe('Appointments - Booking Flow', () => {
  test('should navigate to booking page', async ({ page }) => {
    await page.goto('/appointments/book');
    await expect(page).toHaveURL(/\/login|\/appointments\/book/);
  });
});
