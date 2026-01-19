import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AnecdotesContextProvider } from "./context/anecdotesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AnecdotesContextProvider>
      <App />
    </AnecdotesContextProvider>
  </BrowserRouter>
);
