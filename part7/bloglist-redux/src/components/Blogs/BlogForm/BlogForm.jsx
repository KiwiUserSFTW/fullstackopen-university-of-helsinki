import { useState } from "react";

// api
import blogService from "../../../services/blogs";

// hooks
import { useShowNotification } from "../../../hooks/useNotification";

import { messageTypes } from "../../../reducers/notificationReducer";

const BlogForm = ({ setBlogs, onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const setNotification = useShowNotification();

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
        const createdBlog = await blogService.create({ title, author, url });
        clearFields();
        handleClose();
        setBlogs((blogs) => [...blogs, createdBlog]);
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
      <h1> create new </h1>
      <div>
        <label>
          title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit"> submit </button>
      <button onClick={handleClose}> cancel </button>
    </form>
  );
};

export default BlogForm;
