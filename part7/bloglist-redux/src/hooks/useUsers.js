import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { setupUsers } from "../reducers/usersReducer";

export const useGetUsers = () => {
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(setupUsers());
    }
  }, [users, dispatch]);

  return users;
};
