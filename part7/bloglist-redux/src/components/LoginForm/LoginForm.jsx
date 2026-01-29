// react
import { useState } from "react";

// api
import { login } from "../../services/login";
import blogsService from "../../services/blogs";

// hooks
import { useShowNotification } from "../../hooks/useNotification";

// components
import Notifier from "../general/Notifier/Notifier";

import { messageTypes } from "../../reducers/notificationReducer";

const LoginForm = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setNotification = useShowNotification();

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
      const user = await login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setNotification({
        message: "loging succesfull",
        type: messageTypes.INFO,
      });
      
      blogsService.setToken(user.token);
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
