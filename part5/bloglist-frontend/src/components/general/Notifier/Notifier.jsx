import { useEffect } from "react";

const messageTypes = {
  ERROR: "error",
  NOTIFICATION: "notification",
};

const createStyle = (basic, newStyles) => {
  return {
    ...basic,
    ...newStyles,
  };
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
    const basicStyles = {
      padding: "20px",
      borderRadius: "20px",
    };
    const notification = {
      color: "green",
      border: "1px solid green",
    };
    const error = {
      color: "red",
      border: "1px solid red",
    };
    return type === messageTypes.ERROR
      ? createStyle(basicStyles, error)
      : createStyle(basicStyles, notification);
  };
  return (
    <div>
      <h2 style={styles()}> {value}</h2>
    </div>
  );
};

export default Notifier;
