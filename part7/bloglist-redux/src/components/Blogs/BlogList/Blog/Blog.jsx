import { useState } from "react";

// components
import Togglable from "../../../general/Togglable.jsx/Togglable";

// style
import "./Blog.css";

// hooks
import { useShowNotification } from "../../../../hooks/useNotification";

import { messageTypes } from "../../../../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const setNotification = useShowNotification();

  /*
  const formatedBlog = () => ({
    user: blog.user.id,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  });
  */

  const handleDelete = async () => {
    const deleteConfirm = window.confirm(
      `Are you sure in deleting blog added by ${blog.user.username}`,
    );

    if (!deleteConfirm) return;

    try {
      /*
      await blogsService.deleteOne(blog.id);
      setNotification({
        message: "blog deleted succesfully",
        type: messageTypes.INFO,
      });
      */
      alert(" DELETE FUNC");
    } catch (error) {
      console.error("deleting blog error", error);
      setNotification({
        message: "you can delete only blogs which you have created",
        type: messageTypes.ERROR,
      });
    }
  };
  const handleLike = async () => {
    try {
      /* 
      const updatedBlog = { ...formatedBlog(), likes: blog.likes + 1 };
      const responsedBlog = await blogsService.update(updatedBlog, blog.id);

      setBlogs((prev) =>
        prev.map((b) =>
          b.id === responsedBlog.id ? { ...b, likes: responsedBlog.likes } : b,
        ),
      );
      */
      alert("LIKE FUNC");
      setNotification({
        message: `${blog.title} liked`,
        type: messageTypes.INFO,
      });
    } catch (error) {
      console.error("like adding error", error);
      setNotification({
        message:
          "you can like only blogs which you have created, the endpoint for increasing likes only is not yet implemented",
        type: messageTypes.ERROR,
      });
    }
  };

  return (
    <div className="blog">
      <div>
        {` ${blog.title} ${blog.author}`}
        {detailsVisible ? (
          <button onClick={() => setDetailsVisible(false)}> hide </button>
        ) : (
          <button onClick={() => setDetailsVisible(true)}> show </button>
        )}
      </div>
      <Togglable visible={detailsVisible}>
        <div className="details">
          <p>
            <span>Likes: {blog.likes}</span>
            <button onClick={handleLike}> like </button>
          </p>
          <span>
            Url: <a href={blog.url}>{blog.url}</a>
          </span>
        </div>
        <button
          className={`delete ${
            user.username !== blog.user.username ? "hide" : ""
          }`}
          onClick={handleDelete}
        >
          delete
        </button>
      </Togglable>
    </div>
  );
};

export default Blog;
