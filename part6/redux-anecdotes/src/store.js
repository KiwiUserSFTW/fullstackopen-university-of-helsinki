// redux
import { configureStore } from "@reduxjs/toolkit";

// reducers
import anecdoteReducer from "./reducers/anecdoteReducer/anecdoteReducer";
import filterReducer from "./reducers/filterReducer/filterReducer";
import notificationReducer from "./reducers/notificationReducer/notificationReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});

export default store;
