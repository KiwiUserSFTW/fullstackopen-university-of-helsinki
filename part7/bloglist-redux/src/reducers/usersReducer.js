// redux
import { createSlice } from "@reduxjs/toolkit";

// api
import userService from "../services/users";

const usersReducer = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

const { setUsers } = usersReducer.actions;

export const setupUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      throw new Error("getting users failed, error - ", error);
    }
  };
};

export default usersReducer.reducer;
