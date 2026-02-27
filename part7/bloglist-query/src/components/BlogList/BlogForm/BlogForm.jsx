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
    <form onSubmit={handleSubmit}>
      <h1 className="title is-5"> create new blog </h1>
      <div className="field">
        <label className="label">
          title
          <div className="control">
            <input
              className="input"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
        </label>
      </div>
      <div className="field">
        <label className="label">
          author
          <div className="control">
            <input
              className="input"
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
        </label>
      </div>
      <div className="field">
        <label className="label">
          url
          <div className="control">
            <input
              className="input"
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
        </label>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button has-text-primary-30" type="submit">
            submit
          </button>
        </div>
        <div className="control">
          <button className="button has-text-danger-80" onClick={handleClose}>
            cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
