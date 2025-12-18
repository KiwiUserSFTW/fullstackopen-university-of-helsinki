// react
import ReactDOM from "react-dom/client";

// redux
import { Provider } from "react-redux";

// components
import App from "./App";

// store
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
