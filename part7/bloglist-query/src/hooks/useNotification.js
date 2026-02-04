import { useContext } from "react";
import NotificationContext from "../context/notificationContext";

export const useShowNotification = () => {
  const { setNotification } = useContext(NotificationContext);

  return (notification, delay = 5) => {
    setNotification(notification, delay);
  };
};

export const useNotification = () => {
  const { notification } = useContext(NotificationContext);
  console.log(notification, " NOTIFICATION 123123 ");
  return notification;
};
