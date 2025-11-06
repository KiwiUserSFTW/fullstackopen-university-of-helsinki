export const url = "http://localhost:5173/";

export const resetBlogs = async ({ request }) => {
  await request.post(apiUrl + "testing");
};

export const createUser = async ({ request }) => {
  const userData = {
    name: "Joe",
    username: "Joe Dopi",
    password: "secret",
  };

  await request.post(apiUrl + "users", {
    data: userData,
  });

  return {
    username: userData.username,
    password: userData.password,
  };
};
