// notificationHelper.js
import { setNotification, removeNotificatoin } from "./notificationReducer";

let timeoutId;

export const showNotification = (dispatch, message, delay = 5000) => {
  dispatch(setNotification(message));

  // if it was initiated more than once
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    dispatch(removeNotificatoin());
  }, delay);
};
