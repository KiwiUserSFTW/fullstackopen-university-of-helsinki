// react
import { useState } from "react";

// hooks
import { useShowNotification } from "../../hooks/useNotification";

// components
import Notifier from "../general/Notifier/Notifier";

import { messageTypes } from "../../reducers/notificationReducer";
import { useGetUser, useLoginUser } from "../../hooks/useUser";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = useGetUser();

  const setNotification = useShowNotification();
  const login = useLoginUser();

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
      await login(username, password);
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
    <form className="field"onSubmit={handleLogin}>
      <h1 className="title is-2"> log in to application</h1>
      <Notifier />
      <div>
        <label className="label">
          username
          <div className="control">
            <input
              className="input"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
        </label>
      </div>
      <div>
        <label className="label">
          password
          <div className="control">
            <input
              className="input"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </label>
      </div>
      <div className="control">
        <button className="button has-text-primary-30" type="submit">
          login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
