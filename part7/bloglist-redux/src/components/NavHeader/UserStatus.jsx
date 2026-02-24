// styles
import { Button } from "react-bootstrap";

// hooks
import { useSelector } from "react-redux";
import { useShowNotification } from "../../hooks/useNotification";
import { useLogoutUser } from "../../hooks/useUser";

import { messageTypes } from "../../reducers/notificationReducer";

const UserStatus = () => {
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
    <div className="d-flex align-items-center gap-2 text-success">
      <div> {user.name} logged in</div>
      <Button variant="secondary" onClick={handleLogout}>
        log out
      </Button>
    </div>
  );
};

export default UserStatus;
