import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return "";
    },
  },
});

const { setNotification, removeNotification } = notificationSlice.actions;

// showNotification thunk
let timeoutId = null;

export const showNotification = (message, delay = 5) => {
  return (dispatch) => {
    dispatch(setNotification(message));

    // if it was initiated more than once
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch(removeNotification());
      timeoutId = null;
    }, delay * 1000);
  };
};

export default notificationSlice.reducer;
