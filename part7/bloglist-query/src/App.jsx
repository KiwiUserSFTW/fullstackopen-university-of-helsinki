// react & router
import { useEffect } from "react";
import Router from "./router";

// hooks
import { useCheckLoginInLocalStorage, useGetUser } from "./hooks/useUser";

// components
import Notifier from "./components/general/Notifier/Notifier";
import LoginForm from "./components/LoginForm/LoginForm";

const App = () => {
  const user = useGetUser();
  const checkUserInStorage = useCheckLoginInLocalStorage();

  useEffect(() => {
    checkUserInStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user === null ? (
    <LoginForm />
  ) : (
    <div>
      <Notifier />
      <Router />
    </div>
  );
};

export default App;
