// react
import ReactDOM from "react-dom/client";

// componens
import App from "./App";

// context
import { NotificationContextProvider } from "./context/notificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>,
);
