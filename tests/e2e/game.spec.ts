import { test, expect } from "@playwright/test";

test.describe("Game Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the main page", async ({ page }) => {
    await expect(page).toHaveTitle(/Horse Racing/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should have theme toggle button", async ({ page }) => {
    const themeToggle = page.getByRole("button", { name: /switch to/i });
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toBeEnabled();
  });

  test("should toggle theme when theme button is clicked", async ({ page }) => {
    const themeToggle = page.getByRole("button", { name: /switch to/i });


    const initialAriaPressed = await themeToggle.getAttribute("aria-pressed");


    await themeToggle.click();


    const newAriaPressed = await themeToggle.getAttribute("aria-pressed");
    expect(newAriaPressed).not.toBe(initialAriaPressed);
  });

  test("should have navigation tabs", async ({ page }) => {
    const tablist = page.getByRole("tablist");
    await expect(tablist).toBeVisible();

    const tabs = page.getByRole("tab");
    await expect(tabs.first()).toBeVisible();
  });

  test("should switch between tabs", async ({ page }) => {
    const tabs = page.getByRole("tab");
    const firstTab = tabs.first();
    const secondTab = tabs.nth(1);


    await firstTab.click();
    await expect(firstTab).toHaveAttribute("aria-selected", "true");


    await secondTab.click();
    await expect(secondTab).toHaveAttribute("aria-selected", "true");
    await expect(firstTab).toHaveAttribute("aria-selected", "false");
  });

  test("should have table with data", async ({ page }) => {
    const table = page.locator("table");
    await expect(table).toBeVisible();

    const rows = table.locator("tbody tr");
    await expect(rows.first()).toBeVisible();
  });

  test("should have scrollable table", async ({ page }) => {

    const tableContainer = page.locator("div.max-h-96.overflow-y-auto.custom-scrollbar").filter({ has: page.locator("table") });
    await expect(tableContainer).toBeVisible();
  });
});
