// hooks
import { useShowNotification } from "../../hooks/useNotification";
import { useGetUser, useLogoutUser } from "../../hooks/useUser";

import { messageTypes } from "../../reducers/notificationReducer";

const UserStatus = () => {
  const setNotification = useShowNotification();

  const user = useGetUser();
  const logout = useLogoutUser();

  const handleLogout = () => {
    logout();
    setNotification({
      message: "you have been logout succesfull",
      type: messageTypes.INFO,
    });
  };
  return (
    <div
      style={{
        gap: "5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="title is-4" style={{ margin: 0 }}>
        {user.name} logged in
      </div>
      <button className="button" onClick={handleLogout}>
        log out
      </button>
    </div>
  );
};

export default UserStatus;
