// react & router
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// components
import App from "./App";

// contexts
import { AnecdotesContextProvider } from "./context/anecdotesContext";
import { NotificationContextProvider } from "./context/notificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AnecdotesContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </AnecdotesContextProvider>
  </BrowserRouter>
);
