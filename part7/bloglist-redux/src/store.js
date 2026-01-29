// redux
import { configureStore } from "@reduxjs/toolkit";

// reducers
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
  },
});
