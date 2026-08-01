import { test, expect } from '@playwright/test';

test.describe('Video Consultation - WebRTC Session', () => {
  test('should load consultation video room or redirect', async ({ page }) => {
    await page.goto('/consultation/video/room-123');
    await expect(page).toHaveURL(/\/login|\/consultation\/video\/room-123/);
  });
});
