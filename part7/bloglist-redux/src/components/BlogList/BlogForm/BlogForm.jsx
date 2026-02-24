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
import { useShowNotification } from "../../../hooks/useNotification";

import { messageTypes } from "../../../reducers/notificationReducer";
import { useCreateBlog } from "../../../hooks/useBlogs";

const BlogForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const setNotification = useShowNotification();
  const createBlog = useCreateBlog();

  const clearFields = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const formValidate = () => {
    if (!title || !author || !url) {
      setNotification({ message: "fill all fields", type: messageTypes.ERROR });
      return false;
    }

    return true;
  };

  const handleClose = (e) => {
    e?.preventDefault();
    clearFields();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValidate()) {
      try {
        createBlog({ title, author, url });

        clearFields();
        handleClose();

        setNotification({
          message: "blog created succesfull",
          type: messageTypes.INFO,
        });
      } catch (error) {
        setNotification({
          message: `blog creation failed, error: ${error}`,
          type: messageTypes.ERROR,
        });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3> create new </h3>
      <FormGroup className="mb-3">
        <FormLabel>Title</FormLabel>
        <FormControl
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Enter title"
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <FormLabel>Author</FormLabel>
        <FormControl
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Enter author"
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Url</FormLabel>
        <FormControl
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Enter url"
        />
      </FormGroup>
      <div className="d-flex gap-2">
        <Button variant="success" type="submit">
          submit
        </Button>
        <Button variant="warning" onClick={handleClose}>
          cancel
        </Button>
      </div>
    </Form>
  );
};

export default BlogForm;
