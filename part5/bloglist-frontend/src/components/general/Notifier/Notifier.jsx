import { useEffect } from "react";
import "./Notifier.css";

const messageTypes = {
  ERROR: "error",
  NOTIFICATION: "notification",
};

const Notifier = ({ notification, setNotification }) => {
  const { value = null, type = null } = notification;

  useEffect(() => {
    if (value) {
      setTimeout(() => {
        setNotification({});
      }, 5000);
    }
  }, [value, setNotification]);

  if (!value) return null;

  const styles = () => {
    const notification = "notification";
    const error = "error";
    return type === messageTypes.ERROR ? error : notification;
  };
  return <div className={`message ${styles()}`}>{value}</div>;
};

export default Notifier;
