// @ts-check
import { test as base, expect } from "@playwright/test";
import { createUser, login, resetDb, url } from "./helper";

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
  test.describe("one user exist in db", () => {
    let user = { username: "", password: "", name: "" };
    test.beforeEach(async ({ request }) => {
      await resetDb(request);
      user = await createUser(request);
    });
    test("login with valid credentials", async ({ page }) => {
      // login using form
      await login(page, user);

      await expect(page.getByText(`${user.name} logged in`)).toBeVisible();
    });
    test("login fails with wrong credentials", async ({ page }) => {
      // login using form with wrong creds
      await login(page, { ...user, password: "wrong password" });

      await expect(page.locator(".error")).toContainText("wrong credentials");
      await expect(page.getByText(`${user.name} logged in`)).not.toBeVisible();
    });
  });
});
