// @ts-check
import { test as base, expect } from "@playwright/test";
import { createBlog, createUser, login, resetDb, url } from "./helper";

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
    test.describe("When logged in and one blog exist", () => {
      const newBlog = {
        title: "Sea waves is dangesr for little crabs",
        author: "Smart fish",
        url: "ocean.com",
      };

      test.beforeEach(async ({ page }) => {
        // login using form
        await login(page, user);

        // creating blog using user actions
        await createBlog(page, newBlog);
      });

      test("a new blog can be created", async ({ page }) => {
        // blog exist on page
        await expect(page.locator(".notification")).toContainText(
          "blog created succesfull"
        );
        await expect(
          page.getByText(`${newBlog.title} ${newBlog.author}`, { exact: false })
        ).toBeVisible();
      });

      test("blog can be liked", async ({ page }) => {
        // find blog
        const blog = page.locator(".blog").filter({ hasText: newBlog.title });

        await blog.getByRole("button", { name: "show" }).click();
        await blog.getByRole("button", { name: "like" }).click();
        await expect(blog.getByText("Likes: 1 like")).toBeVisible();
      });

      test("created blog have delete button", async ({ page }) => {
        const blog = page.locator(".blog").filter({ hasText: newBlog.title });

        await blog.getByRole("button", { name: "show" }).click();
        await expect(
          blog.getByRole("button", { name: "delete" })
        ).toBeVisible();
      });

      test("someone else blog don't have delete button", async ({
        page,
        request,
      }) => {
        await page.getByRole("button", { name: "log out" }).click();

        const user = await createUser(request, {
          name: "Nia",
          username: "Nia Las",
          password: "bestyUnicorn",
        });
        await login(page, user);
        const blog = page.locator(".blog").filter({ hasText: newBlog.title });

        await blog.getByRole("button", { name: "show" }).click();
        await expect(
          blog.getByRole("button", { name: "delete" })
        ).not.toBeVisible();
      });

      test("created blog can be deleted", async ({ page }) => {
        const blog = page.locator(".blog").filter({ hasText: newBlog.title });

        // exist before deleting
        await expect(
          blog.getByText(`${newBlog.title} ${newBlog.author}`, { exact: false })
        ).toBeVisible();

        await blog.getByRole("button", { name: "show" }).click();
        page.on("dialog", (dialog) => dialog.accept());
        await blog.getByRole("button", { name: "delete" }).click();

        // not exist after deleting
        await expect(
          blog.getByText(`${newBlog.title} ${newBlog.author}`, { exact: false })
        ).not.toBeVisible();
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
