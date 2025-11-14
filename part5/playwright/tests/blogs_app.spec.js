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
      // creating one fresh user to clean dbf
      await resetDb(request);
      user = await createUser(request);
    });

    test.describe("When logged in", () => {
      test.beforeEach(async ({ page }) => {
        // login using form
        await login(page, user);
      });

      test("a new blog can be created", async ({ page }) => {
        const newBlog = {
          title: "Sea waves is dangesr for little crabs",
          author: "Smart fish",
          url: "ocean.com",
        };

        // filling the form
        await page.getByRole("button", { name: "create new blog" }).click();
        await page.getByLabel("title").fill(newBlog.title);
        await page.getByLabel("author").fill(newBlog.author);
        await page.getByLabel("url").fill(newBlog.url);

        // assert
        await page.getByRole("button", { name: "submit" }).click();
        await expect(page.locator(".notification")).toContainText(
          "blog created succesfull"
        );
        await expect(
          page.getByText(`${newBlog.title} ${newBlog.author}`, { exact: false })
        ).toBeVisible();
      });
    });

    test.describe("Login", () => {
      test("'succeeds with correct credentials'", async ({ page }) => {
        // login using form
        await login(page, user);

        await expect(page.getByText(`${user.name} logged in`)).toBeVisible();
      });
      test("fails with wrong credentials", async ({ page }) => {
        // login using form with wrong creds
        await login(page, { ...user, password: "wrong password" });

        await expect(page.locator(".error")).toContainText("wrong credentials");
        await expect(
          page.getByText(`${user.name} logged in`)
        ).not.toBeVisible();
      });
    });
  });
});
