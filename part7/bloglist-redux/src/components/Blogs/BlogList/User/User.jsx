// hooks
import { useSelector } from "react-redux";
import { useShowNotification } from "../../../../hooks/useNotification";
import { useLogoutUser } from "../../../../hooks/useUser";

import { messageTypes } from "../../../../reducers/notificationReducer";

const User = () => {
  const setNotification = useShowNotification();

  const user = useSelector((state) => state.user);
  const logout = useLogoutUser();

  const handleLogout = () => {
    logout();
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
