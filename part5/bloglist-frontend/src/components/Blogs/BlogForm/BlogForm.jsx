import { useState } from "react";

// api
import blogService from "../../../services/blogs";

const BlogForm = ({ setBlogs, setNotification, onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const clearFields = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const formValidate = () => {
    if (!title || !author || !url) {
      setNotification({ value: "fill all fields", type: "error" });
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
          value: "blog created succesfull",
          type: "notification",
        });
      } catch (error) {
        setNotification({
          value: `blog creation failed, error: ${error}`,
          type: "error",
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
