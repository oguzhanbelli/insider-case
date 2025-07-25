import { test, expect } from "@playwright/test";

test.describe("Responsive Design", () => {
  test("should work on mobile devices", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");


    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("button", { name: /switch to/i })).toBeVisible();
    await expect(page.getByRole("tablist")).toBeVisible();
  });

  test("should work on tablet devices", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    await expect(page.locator("table")).toBeVisible();
    await expect(page.getByRole("tablist")).toBeVisible();
  });

  test("should work on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    await expect(page.locator("table")).toBeVisible();
    await expect(page.getByRole("tablist")).toBeVisible();
  });

  test("should maintain functionality across breakpoints", async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },   // Mobile
      { width: 768, height: 1024 },  // Tablet
      { width: 1920, height: 1080 },  // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto("/");


      const themeToggle = page.getByRole("button", { name: /switch to/i });
      await themeToggle.click();
      await expect(themeToggle).toHaveAttribute("aria-pressed");


      const tabs = page.getByRole("tab");
      if (await tabs.count() > 1) {
        await tabs.nth(1).click();
        await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
      }
    }
  });
});
