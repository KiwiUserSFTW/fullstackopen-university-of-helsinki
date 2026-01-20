// react
import { useContext } from "react";

// context
import NotificationContext from "../context/notificationContext";

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  if (!notification) return null;

  return <div>{notification}</div>;
};

export default Notification;
