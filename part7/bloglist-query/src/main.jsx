// react & router
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// componens
import App from "./App";

// context
import { NotificationContextProvider } from "./context/notificationContext";
import { UserContextProvider } from "./context/userContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <UserContextProvider>
          <App/>
        </UserContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
