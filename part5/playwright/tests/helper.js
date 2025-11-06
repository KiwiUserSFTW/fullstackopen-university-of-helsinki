export const url = "http://localhost:5173/";

export const resetDb = async (request) => {
  await request.post(url + "api/testing/reset");
};

export const createUser = async (request) => {
  const userData = {
    name: "Joe",
    username: "Sea Delpin",
    password: "secret",
  };

  await request.post(url + "api/users", {
    data: userData,
  });

  return {
    username: userData.username,
    password: userData.password,
    name: userData.name,
  };
};

export const login = async (page, user) => {
  await page.getByLabel("username").fill(user.username);
  await page.getByLabel("password").fill(user.password);
  await page.getByRole("button", { name: "login" }).click();
};
