// react
import { useState } from "react";
import { useSelector } from "react-redux";

// hooks
import { useShowNotification } from "../../hooks/useNotification";

// components
import Notifier from "../general/Notifier/Notifier";

import { messageTypes } from "../../reducers/notificationReducer";
import { useLoginUser } from "../../hooks/useUser";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setNotification = useShowNotification();
  const login = useLoginUser();

  const user = useSelector((state) => state.user);

  if (user) return null;

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!password || !username) {
      const errorMessage = "password or username is missing";
      setNotification({
        message: errorMessage,
        type: messageTypes.ERROR,
      });
      return console.error();
    }

    try {
      login(username, password);
      setNotification({
        message: "loging succesfull",
        type: messageTypes.INFO,
      });
    } catch {
      setNotification({
        message: "wrong credentials",
        type: messageTypes.ERROR,
      });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1> log in to application</h1>
      <Notifier />
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
