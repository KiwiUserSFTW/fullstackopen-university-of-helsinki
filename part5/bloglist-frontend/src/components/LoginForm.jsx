import { useState } from "react";

// api
import { login } from "../services/login";

const LoginForm = ({ user, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (user) return null;
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!password || !username) {
      return console.error("password or username is missing");
    }
    try {
      const user = await login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("worng credentials", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1> log in to application</h1>
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
