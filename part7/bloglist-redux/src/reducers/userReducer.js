import { createSlice } from "@reduxjs/toolkit";

const initState = null;

const userReducer = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser() {
      return initState;
    },
  },
});

export const { setUser, removeUser } = userReducer.actions;
export default userReducer.reducer;
