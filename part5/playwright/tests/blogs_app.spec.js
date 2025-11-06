// @ts-check
import { test as base, expect } from "@playwright/test";
import { url } from "./helper";

const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto(url);
    await use(page);
  },
});

test.describe("Blog list", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });
  test.describe("user not logged in", () => {
    test("has login form by default", async ({ page }) => {
      const username = page.getByLabel("username");
      const password = page.getByLabel("password");

      // Expect have login form
      await expect(page.getByText("log in to application")).toBeVisible();
      await expect(username).toBeVisible();
      await expect(password).toBeVisible();
    });
  });
});
