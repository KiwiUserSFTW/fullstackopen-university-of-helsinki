export const url = "http://localhost:5173/";

export const resetDb = async (request) => {
  await request.post(url + "api/testing/reset");
};

export const createUser = async (
  request,
  userData = {
    name: "Joe",
    username: "Sea Delpin",
    password: "secret",
  }
) => {
  await request.post(url + "api/users", {
    data: userData,
  });

  return {
    username: userData.username,
    password: userData.password,
    name: userData.name,
  };
};

export const createBlog = async (page, newBlog) => {
  try {
    // apply the form
    await page.getByRole("button", { name: "create new blog" }).click();
    await page.getByLabel("title").fill(newBlog.title);
    await page.getByLabel("author").fill(newBlog.author);
    await page.getByLabel("url").fill(newBlog.url);
    await page.getByRole("button", { name: "submit" }).click();
  } catch (error) {
    console.error("creating new blog error");
  }
};
export const login = async (page, user) => {
  await page.getByLabel("username").fill(user.username);
  await page.getByLabel("password").fill(user.password);
  await page.getByRole("button", { name: "login" }).click();
};
