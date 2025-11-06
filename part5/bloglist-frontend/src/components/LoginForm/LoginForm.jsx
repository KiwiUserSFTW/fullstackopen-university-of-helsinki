import { useState } from "react";

// api
import { login } from "../../services/login";
import blogsService from "../../services/blogs";
import Notifier from "../general/Notifier/Notifier";

const LoginForm = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

  if (user) return null;
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!password || !username) {
      setNotification({
        value: "user or password missing",
        type: "error",
      });
      return console.error("password or username is missing");
    }
    try {
      const user = await login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setNotification({
        value: "loging succesfull",
        type: "notification",
      });
      blogsService.setToken(user.token);
    } catch {
      setNotification({
        value: "wrong credentials",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1> log in to application</h1>
      <Notifier notification={notification} setNotification={setNotification} />
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
