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
    test.describe("When loggen in", () => {
      test.beforeEach(async ({ page }) => {
        // login using form
        await login(page, user);
      });

      test.describe("and two blogs exist", () => {
        const blogs = [
          {
            title: "First Coral reefs need more protection",
            author: "Blue Dolphin",
            url: "ocean.com/savecoral",
          },
          {
            title: "Second Why jellyfish glow in the dark",
            author: "Ocean Scientist",
            url: "ocean.com/jellyfish",
          },
        ];

        test.beforeEach(async ({ page }) => {
          for (const blog of blogs) {
            await createBlog(page, blog);
          }
        });
        test("blogs are arranged in the order according to the likes", async ({
          page,
        }) => {
          const firstBlog = page.locator(".blog").nth(0);
          const secondBlog = page.locator(".blog").nth(1);

          // ensure in initial arrangement, a = first blog, b = second blog
          await expect(firstBlog).toHaveText(new RegExp(`${blogs[0].title}.*`));

          // like second (b) blog in the list
          await secondBlog.getByRole("button", { name: "show" }).click();
          await secondBlog.getByRole("button", { name: "like" }).click();

          // second blog (b) should set as first
          await expect(firstBlog).toHaveText(new RegExp(`${blogs[1].title}.*`));

          // like second (a) blog in the list
          await secondBlog.getByRole("button", { name: "show" }).click();
          await secondBlog.getByRole("button", { name: "like" }).click();

          // ensure that (a) blog set as first again
          await expect(firstBlog).toHaveText(new RegExp(`${blogs[0].title}.*`));
        });
      });
      test.describe("and one blog exist", () => {
        const newBlog = {
          title: "Sea waves is dangesr for little crabs",
          author: "Smart fish",
          url: "ocean.com",
        };

        test.beforeEach(async ({ page }) => {
          // creating blog using user actions
          await createBlog(page, newBlog);
        });

        test("a new blog can be created", async ({ page }) => {
          // blog exist on page
          await expect(page.locator(".notification")).toContainText(
            "blog created succesfull"
          );
          await expect(
            page.getByText(`${newBlog.title} ${newBlog.author}`, {
              exact: false,
            })
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
        test("created blog can be deleted", async ({ page }) => {
          const blog = page.locator(".blog").filter({ hasText: newBlog.title });

          // exist before deleting
          await expect(
            blog.getByText(`${newBlog.title} ${newBlog.author}`, {
              exact: false,
            })
          ).toBeVisible();

          await blog.getByRole("button", { name: "show" }).click();
          page.on("dialog", (dialog) => dialog.accept());
          await blog.getByRole("button", { name: "delete" }).click();

          // not exist after deleting
          await expect(
            blog.getByText(`${newBlog.title} ${newBlog.author}`, {
              exact: false,
            })
          ).not.toBeVisible();
        });
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
