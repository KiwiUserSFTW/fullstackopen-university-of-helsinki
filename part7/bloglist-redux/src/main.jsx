// react
import ReactDOM from "react-dom/client";

// redux
import { Provider } from "react-redux";
import { store } from "./store";

// router
import { BrowserRouter } from "react-router-dom";

// componens
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
