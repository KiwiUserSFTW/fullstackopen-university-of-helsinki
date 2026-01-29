import { createSlice } from "@reduxjs/toolkit";

export const messageTypes = {
  ERROR: "error",
  INFO: "info",
};

const initialState = {
  message: "",
  type: messageTypes.INFO,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return initialState;
    },
  },
});

const { setNotification, removeNotification } = notificationSlice.actions;

// showNotification thunk
let timeoutId = null;

export const showNotification = (notification, delay) => {
  return (dispatch) => {
    dispatch(setNotification(notification));

    // if it was called more than once
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
