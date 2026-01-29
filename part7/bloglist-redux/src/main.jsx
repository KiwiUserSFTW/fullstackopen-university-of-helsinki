// react
import ReactDOM from "react-dom/client";

// redux
import { Provider } from "react-redux";
import { store } from "./store";

// componens
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
