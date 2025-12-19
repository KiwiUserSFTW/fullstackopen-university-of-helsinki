import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "2px solid grey",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 100,
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
