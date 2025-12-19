// reducers
import notificationReducer, {
  removeNotificatoin,
  setNotification,
} from "./notificationReducer";

describe("notification reducer", () => {
  test("notification can be changed with action notification/setNotification", () => {
    const value = "new value";
    const newState = notificationReducer(undefined, setNotification(value));

    expect(newState).toEqual(value);
  });
  test("notification can be cleared with action notification/removeNotification", () => {
    const value = "new value";
    const stateAtStart = notificationReducer(undefined, setNotification(value));
    const stateAfterRemoving = notificationReducer(
      stateAtStart,
      removeNotificatoin
    );
    expect(stateAfterRemoving).toEqual("");
  });
});
