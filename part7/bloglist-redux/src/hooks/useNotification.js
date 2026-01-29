import { showNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

export const useShowNotification = () => {
  const dispatch = useDispatch();

  return (notification, delay = 5) => {
    dispatch(showNotification(notification, delay));
  };
};
