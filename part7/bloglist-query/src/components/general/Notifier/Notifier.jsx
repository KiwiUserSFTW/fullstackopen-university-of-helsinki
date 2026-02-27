// hooks
import { messageTypes } from "../../../reducers/notificationReducer";
import { useNotification } from "../../../hooks/useNotification";

const Notifier = () => {
  const { message, type } = useNotification();

  if (message == "") return null;

  const styles = () => {
    const info = "has-text-primary-40";
    const error = "has-text-danger-40";
    return type === messageTypes.ERROR ? error : info;
  };
  return (
    <div
      className={`message ${styles()} notification p-4 m-5 is-size-4 has-text-centered`}
    >
      {message}
    </div>
  );
};

export default Notifier;
