import { createSlice } from "@reduxjs/toolkit";

const initialState = "notification initial massage";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotificatoin() {
      return "";
    },
  },
});

export const { setNotification, removeNotificatoin } =
  notificationSlice.actions;
export default notificationSlice.reducer;
