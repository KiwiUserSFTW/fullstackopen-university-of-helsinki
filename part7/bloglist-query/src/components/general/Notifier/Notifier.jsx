// styles
import "./Notifier.css";

// hooks
import { messageTypes } from "../../../reducers/notificationReducer";
import { useNotification } from "../../../hooks/useNotification";

const Notifier = () => {
  const { message, type } = useNotification();
  const notificatoin = useNotification();
  console.log(notificatoin, "NOTIFIATION ")
  console.log(message, type, "one");
  if (message == "") return null;

  const styles = () => {
    const info = "info";
    const error = "error";
    return type === messageTypes.ERROR ? error : info;
  };
  return <div className={`message ${styles()}`}>{message}</div>;
};

export default Notifier;
