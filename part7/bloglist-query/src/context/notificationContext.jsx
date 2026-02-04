// react
import { useReducer, useRef, createContext } from "react";

// reducer
import notificationReducer, {
  setNotification as setActionCreator,
  removeNotification,
} from "../reducers/notificationReducer";

import { initialNotificationState } from "../reducers/notificationReducer";

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialNotificationState,
  );

  const timeId = useRef();

  const setNotification = (notification, delay = 5) => {
    if (timeId.current) {
      clearTimeout(timeId.current);
    }
    notificationDispatch(setActionCreator(notification));

    timeId.current = setTimeout(() => {
      notificationDispatch(removeNotification());
    }, delay * 1000);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
