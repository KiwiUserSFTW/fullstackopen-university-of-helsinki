// react & redux
import { useSelector } from "react-redux";
import { useEffect } from "react";

// components
import Blogs from "./components/Blogs/Blogs";
import LoginForm from "./components/LoginForm/LoginForm";

// hooks
import { useCheckLoginInLocalStorage } from "./hooks/useUser";

const App = () => {
  const user = useSelector((state) => state.user);

  const checkUserInStorage = useCheckLoginInLocalStorage();
  useEffect(() => {
    checkUserInStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user)

  return user !== null ? <Blogs /> : <LoginForm />;
};

export default App;
