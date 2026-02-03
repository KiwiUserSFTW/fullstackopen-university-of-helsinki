// react & redux
import { useDispatch } from "react-redux";

// actions
import { setUser, removeUser } from "../reducers/userReducer";

// api
import { login } from "../services/login";
import blogsService from "../services/blogs";

export const useLoginUser = () => {
  const dispatch = useDispatch();

  return async (username, password) => {
    const user = await login({ username, password });

    blogsService.setToken(user.token);
    window.localStorage.setItem("loggedUser", JSON.stringify(user));

    dispatch(setUser(user));
  };
};

export const useLogoutUser = () => {
  const dispatch = useDispatch();

  return async () => {
    window.localStorage.removeItem("loggedUser");

    dispatch(removeUser());
  };
};

export const useCheckLoginInLocalStorage = () => {
  const dispatch = useDispatch();

  return async () => {
    const localLoggedUser = window.localStorage.getItem("loggedUser");

    if (!localLoggedUser) return;

    const user = JSON.parse(localLoggedUser);

    blogsService.setToken(user.token);
    dispatch(setUser(user));
  };
};
