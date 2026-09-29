import { test, expect } from '@playwright/test';

test('offers: responsive layout, validation, retry, attribution and success', async ({ page }) => {
  await page.route(/googletagmanager.com|google-analytics.com|googleadservices.com|doubleclick.net/, route => route.fulfill({ body: '' }));
  let requests = 0;
  let payload: Record<string, string> = {};
  await page.route(/hook\..*make\.com/, async route => {
    requests++;
    payload = route.request().postDataJSON();
    await route.fulfill({ status: requests === 1 ? 500 : 200, body: 'OK' });
  });
  await page.goto('/offer-test-fixture?gclid=OFFER_TEST&utm_source=google');
  await expect(page.getByRole('link', { name: 'View offer' })).toBeVisible();
  await page.getByRole('button', { name: 'Enquire about this offer' }).first().click();
  const form = page.getByRole('form').first();
  await expect(form.getByLabel('Name', { exact: true })).toBeFocused();
  await form.getByLabel('Name', { exact: true }).fill('Offer QA');
  await form.getByLabel('Email', { exact: true }).fill('qa@example.com');
  await form.getByLabel('Phone', { exact: true }).fill('123');
  await form.getByRole('button', { name: 'Request this offer' }).click();
  await expect(form.getByRole('alert')).toContainText('10-digit');
  expect(requests).toBe(0);
  await form.getByLabel('Phone', { exact: true }).fill('9415550123');
  await form.getByRole('button', { name: 'Request this offer' }).click();
  await expect(form.getByRole('alert')).toContainText("couldn't send");
  await expect(form.getByLabel('Name', { exact: true })).toHaveValue('Offer QA');
  await page.setViewportSize({ width: 375, height: 900 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/offers-mobile.png', fullPage: true });
  await form.evaluate(node => {
    node.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    node.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
  await expect(page.getByRole('status')).toContainText('Your enquiry is with Harmony');
  expect(requests).toBe(2);
  expect(payload.Message).toContain('september-2026-facial');
  expect(payload['Treatment Interest']).toBe('Facial');
  expect(JSON.stringify(payload)).toContain('OFFER_TEST');
  await expect(page.getByRole('link', { name: 'Call Harmony' })).toHaveAttribute('href', 'tel:9419238990');
  await expect(page.getByRole('link', { name: 'Book an appointment' })).toHaveAttribute('href', /patientnow/);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: 'test-results/offers-desktop.png', fullPage: true });
});

test('unapproved offers stay off the real homepage', async ({ page }) => {
  await page.route(/googletagmanager.com|google-analytics.com|googleadservices.com|doubleclick.net|hook\..*make\.com/, route => route.abort());
  await page.goto('/');
  await expect(page.locator('#homepage-offers')).toHaveCount(0);
  await expect(page.getByRole('complementary', { name: 'Featured Harmony offer' })).toHaveCount(0);
});
