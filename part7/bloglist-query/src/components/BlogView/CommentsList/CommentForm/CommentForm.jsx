// react
import { useState } from "react";

// hooks
import { useAddComment } from "../../../../hooks/useBlogs";
import { useShowNotification } from "../../../../hooks/useNotification";

// types
import { messageTypes } from "../../../../reducers/notificationReducer";

const CommentForm = ({ id }) => {
  const [comment, setComment] = useState("");

  const setNotification = useShowNotification();
  const addComment = useAddComment();

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (comment.length === 0) {
      setNotification({
        type: messageTypes.ERROR,
        message: "please type comment",
      });
      return;
    }
    try {
      addComment(id, comment);
      setNotification({
        message: `comment ${comment} created succesfull`,
        type: messageTypes.INFO,
      });
      setComment("");
    } catch (error) {
      setNotification({
        message: `comment adding failed, error: ${error}`,
        type: messageTypes.ERROR,
      });
    }
  };
  return (
    <div>
      <form className="field is-grouped table" onSubmit={handleSubmit}>
        <div>
          <label className="label">
            <input
              className="input"
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </label>
        </div>
        <button className="button has-text-primary-40" type="submit">
          add comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
