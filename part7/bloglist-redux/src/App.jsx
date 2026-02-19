// react & redux
import { useEffect } from "react";
import { useSelector } from "react-redux";

// components
import LoginForm from "./components/LoginForm/LoginForm";
import Router from "./router";
import NavHeader from "./components/NavHeader/NavHeader";
import Notifier from "./components/general/Notifier/Notifier";

// hooks
import { useCheckLoginInLocalStorage } from "./hooks/useUser";

const App = () => {
  const user = useSelector((state) => state.user);

  const checkUserInStorage = useCheckLoginInLocalStorage();
  useEffect(() => {
    checkUserInStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user === null ? (
    <LoginForm />
  ) : (
    <div>
      <NavHeader />
      <h2>blogs app</h2>
      <Notifier />
      <Router />
    </div>
  );
};

export default App;
