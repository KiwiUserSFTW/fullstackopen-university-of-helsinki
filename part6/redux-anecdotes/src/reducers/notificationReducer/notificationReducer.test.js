// reducer
import notificationReducer from "./notificationReducer";

// action types
const notificationActionTypes = {
  setNotification: "notification/setNotification",
  removeNotification: "notification/removeNotification",
};

describe("notification reducer", () => {
  test("notification can be changed with action notification/setNotification", () => {
    const action = {
      type: notificationActionTypes.setNotification,
      payload: "new value",
    };
    const newState = notificationReducer(undefined, action);

    expect(newState).toEqual(action.payload);
  });
  test("notification can be cleared with action notification/removeNotification", () => {
    const stateAtStart = notificationReducer(undefined, {
      type: notificationActionTypes.setNotification,
      payload: "new value",
    });
    const stateAfterRemoving = notificationReducer(stateAtStart, {
      type: notificationActionTypes.removeNotification,
    });
    expect(stateAfterRemoving).toEqual("");
  });
});
