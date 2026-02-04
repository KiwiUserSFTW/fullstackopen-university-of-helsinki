// api
import { login } from "../services/login";
import blogsService from "../services/blogs";

export const useLoginUser = () => {
  return async (username, password) => {
    const user = await login({ username, password });

    blogsService.setToken(user.token);
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
  };
};

export const useLogoutUser = () => {
  return async () => {
    window.localStorage.removeItem("loggedUser");
  };
};

export const useCheckLoginInLocalStorage = () => {
  return async () => {
    const localLoggedUser = window.localStorage.getItem("loggedUser");

    if (!localLoggedUser) return;

    const user = JSON.parse(localLoggedUser);

    blogsService.setToken(user.token);
  };
};
