import { test, expect } from "@playwright/test";

test.describe("UI Components E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Theme Toggle Component", () => {
    test("should have correct accessibility attributes", async ({ page }) => {
      const themeToggle = page.getByRole("button", { name: /switch to/i });

      await expect(themeToggle).toHaveAttribute("aria-pressed");
      await expect(themeToggle).toHaveAttribute("aria-checked");
      await expect(themeToggle).toHaveAttribute("title");
      await expect(themeToggle).toHaveAttribute("aria-label");
    });

    test("should update aria-label when toggled", async ({ page }) => {
      const themeToggle = page.getByRole("button", { name: /switch to/i });

      const initialLabel = await themeToggle.getAttribute("aria-label");
      await themeToggle.click();

      const newLabel = await themeToggle.getAttribute("aria-label");
      expect(newLabel).not.toBe(initialLabel);
    });
  });

  test.describe("Tabs Component", () => {

    test("should have correct tabindex values", async ({ page }) => {
      const tabs = page.getByRole("tab");
      const firstTab = tabs.first();
      const secondTab = tabs.nth(1);

      await firstTab.click();
      await expect(firstTab).toHaveAttribute("tabindex", "0");
      await expect(secondTab).toHaveAttribute("tabindex", "-1");

      await secondTab.click();
      await expect(secondTab).toHaveAttribute("tabindex", "0");
      await expect(firstTab).toHaveAttribute("tabindex", "-1");
    });

    test("should have visual feedback on hover", async ({ page }) => {
      const inactiveTab = page.getByRole("tab").nth(1);

      await inactiveTab.hover();


      const classes = await inactiveTab.getAttribute("class");
      expect(classes).toContain("hover:");
    });
  });

  test.describe("Table Component", () => {
    test("should have sticky header when scrolling", async ({ page }) => {
      const thead = page.locator("thead");
      await expect(thead).toHaveClass(/sticky/);
      await expect(thead).toHaveClass(/top-0/);
    });

    test("should show hover effects on table rows", async ({ page }) => {
      const firstRow = page.locator("tbody tr").first();

      await firstRow.hover();

      const classes = await firstRow.getAttribute("class");
      expect(classes).toContain("hover:");
    });

    test("should have proper table headers", async ({ page }) => {
      const headers = page.locator("thead th");

      await expect(headers).toHaveCount(4);
      await expect(headers.first()).toBeVisible();
    });
  });


});
