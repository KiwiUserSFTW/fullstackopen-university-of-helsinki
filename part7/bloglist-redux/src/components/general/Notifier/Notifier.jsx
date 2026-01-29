// styles
import "./Notifier.css";

// hooks
import { useSelector } from "react-redux";

import { messageTypes } from "../../../reducers/notificationReducer";

const Notifier = () => {
  const { message, type } = useSelector((state) => state.notification);
  if (message == "") return null;

  const styles = () => {
    const info = "info";
    const error = "error";
    return type === messageTypes.ERROR ? error : info;
  };
  return <div className={`message ${styles()}`}>{message}</div>;
};

export default Notifier;
