// redux
import { configureStore } from "@reduxjs/toolkit";

// reducers
import anecdoteReducer from "./reducers/anecdoteReducer/anecdoteReducer";
import filterReducer from "./reducers/filterReducer/filterReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  },
});

export default store;
