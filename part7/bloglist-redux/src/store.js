// redux
import { configureStore } from "@reduxjs/toolkit";

// reducers
import notificationReducer from "./reducers/notificationReducer";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});
