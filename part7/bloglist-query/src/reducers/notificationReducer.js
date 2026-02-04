export const messageTypes = {
  ERROR: "error",
  INFO: "info",
};

export const initialNotificationState = {
  message: "",
  type: messageTypes.INFO,
};

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "REMOVE_NOTIFICATION":
      return initialNotificationState;
    default:
      return state;
  }
};

export const setNotification = (notification) => ({
  type: "SET_NOTIFICATION",
  payload: notification,
});

export const removeNotification = () => ({
  type: "REMOVE_NOTIFICATION",
});

export default notificationReducer;
