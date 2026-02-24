// styles
import "./Notifier.css";
import { Alert } from "react-bootstrap";

// hooks
import { useSelector } from "react-redux";

import { messageTypes } from "../../../reducers/notificationReducer";

const Notifier = () => {
  const { message, type } = useSelector((state) => state.notification);
  if (message == "") return null;

  const variant = () => {
    const info = "success";
    const error = "danger";
    return type === messageTypes.ERROR ? error : info;
  };

  return (
    <Alert className="fs-5" variant={variant()}>
      {message}
    </Alert>
  );
};

// className={`message ${styles()}`}
export default Notifier;
