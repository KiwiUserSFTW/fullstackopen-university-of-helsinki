// react
import { useContext } from "react";

// context
import UserContext from "../context/userContext";

// api
import blogsService from "../services/blogs";
import { login } from "../services/login";

export const useGetUser = () => {
  const { user } = useContext(UserContext);
  
  return user;
};

export const useLoginUser = () => {
  const { setUser } = useContext(UserContext);

  return async (username, password) => {
    const user = await login({ username, password });

    blogsService.setToken(user.token);
    setUser(user);
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
  };
};

export const useLogoutUser = () => {
  const { removeUser } = useContext(UserContext);

  return async () => {
    removeUser();
    window.localStorage.removeItem("loggedUser");
  };
};

export const useCheckLoginInLocalStorage = () => {
  const { setUser } = useContext(UserContext);

  return async () => {
    const localLoggedUser = window.localStorage.getItem("loggedUser");

    if (!localLoggedUser) return;

    const user = JSON.parse(localLoggedUser);
    blogsService.setToken(user.token);

    setUser(user);
  };
};
