import { useEffect } from "react";

const Notification = ({ value, setValue, type }) => {
  const delay = 5000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(null);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value]);

  if (value === null) {
    return null;
  }

  return <div className={type}>{value}</div>;
};

export default Notification;
