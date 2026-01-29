// hooks
import { useShowNotification } from "../../../../hooks/useNotification";

import { messageTypes } from "../../../../reducers/notificationReducer";

const User = ({ user, setUser }) => {
  const setNotification = useShowNotification();

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    setNotification({
      message: "you have been logout succesfull",
      type: messageTypes.INFO,
    });
  };
  return (
    <div>
      <p> {user.name} logged in</p>
      <button onClick={handleLogout}> log out </button>
    </div>
  );
};

export default User;
