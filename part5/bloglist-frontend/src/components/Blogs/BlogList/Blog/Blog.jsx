import { useState } from "react";

// components
import Togglable from "../../../general/Togglable.jsx/Togglable";

// style
import "./Blog.css";

//api
import blogsService from "../../../../services/blogs";

const Blog = ({ blog, setBlogs, setNotification }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const formatedBlog = () => ({
    user: blog.user.id,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  });

  const handleDelete = async () => {
    const deleteConfirm = window.confirm(
      `Are you sure in deleting blog added by ${blog.user.username}`
    );

    if (!deleteConfirm) return;

    try {
      await blogsService.deleteOne(blog.id);
      setNotification({
        value: "blog deleted succesfully",
        type: "notification",
      });
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
    } catch (error) {
      console.error("deleting blog error", error);
      setNotification({
        value: "you can delete only blogs which you have created",
        type: "error",
      });
    }
  };
  const handleLike = async () => {
    try {
      const updatedBlog = { ...formatedBlog(), likes: blog.likes + 1 };
      const responsedBlog = await blogsService.update(updatedBlog, blog.id);

      setBlogs((prev) =>
        prev.map((b) =>
          b.id === responsedBlog.id ? { ...b, likes: responsedBlog.likes } : b
        )
      );
    } catch (error) {
      console.error("like adding error", error);
      setNotification({
        value:
          "you can like only blogs which you have created, the endpoint for increasing likes only is not yet implemented",
        type: "error",
      });
    }
  };

  return (
    <div className="blog">
      <div>
        {blog.title}
        {detailsVisible ? (
          <button onClick={() => setDetailsVisible(false)}> hide </button>
        ) : (
          <button onClick={() => setDetailsVisible(true)}> show </button>
        )}
      </div>
      <Togglable visible={detailsVisible}>
        <div className="details">
          <span>Author: {blog.author}</span>
          <span>
            Likes: {blog.likes} <button onClick={handleLike}> like </button>
          </span>
        </div>
        <button className={"delete"} onClick={handleDelete}>
          delete
        </button>
      </Togglable>
    </div>
  );
};

export default Blog;
