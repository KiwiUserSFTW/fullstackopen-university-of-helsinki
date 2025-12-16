// react
import ReactDOM from "react-dom/client";

// redux
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

// components
import App from "./App";

// reducers
import anecdoteReducer from "./reducers/anecdoteReducer/anecdoteReducer";
import filterReducer from "./reducers/filterReducer/filterReducer";

const store = createStore(
  combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  })
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
