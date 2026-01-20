// react
import { useReducer, useRef, createContext } from "react";

// reducer
import notificationReducer, {
  setNotification as setActionCreator,
  removeNotification,
} from "../reducers/notificationReducer";

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  const timeId = useRef();

  const setNotification = (notification) => {
    if (timeId.current) {
      clearTimeout(timeId.current);
    }
    notificationDispatch(setActionCreator(notification));

    timeId.current = setTimeout(() => {
      notificationDispatch(removeNotification());
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
