// styles
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

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
      await login(username, password);
      setNotification({
        message: "loging succesfull",
        type: messageTypes.INFO,
      });
    } catch (error) {
      console.error(error);
      setNotification({
        message: "wrong credentials",
        type: messageTypes.ERROR,
      });
    }
  };

  return (
    <div>
      <h1> log in to application</h1>
      <Notifier />
      <Form onSubmit={handleLogin}>
        <div>
          <FormLabel>username</FormLabel>
          <FormControl
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <FormLabel>password</FormLabel>
          <FormControl
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="my-2">
          <Button variant="success" type="submit">
            login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
