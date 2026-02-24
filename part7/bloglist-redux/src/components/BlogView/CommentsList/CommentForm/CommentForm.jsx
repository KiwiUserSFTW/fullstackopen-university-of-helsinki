// styles
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

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
      <Form className="d-flex gap-2 flex-row" onSubmit={handleSubmit}>
        <FormGroup>
          <FormControl
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="Enter comment"
          />
        </FormGroup>
        <Button variant="success" type="submit"> add comment </Button>
      </Form>
    </div>
  );
};

export default CommentForm;
