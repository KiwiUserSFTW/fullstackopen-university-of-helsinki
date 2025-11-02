import { useState } from "react";

// components
import Togglable from "../Togglable";

// style
import "./Blog.css";

//api
import blogsService from "../../services/blogs";

const Blog = ({ blog, setBlogs, setNotification }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const formatedBlog = () => ({
    user: blog.user.id,
    likes: blog.likes,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  });

  const handleBlogUpdate = (responsedBlog) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === responsedBlog.id ? { ...b, likes: responsedBlog.likes } : b
      )
    );
  };

  const handleLike = async () => {
    try {
      const updatedBlog = { ...formatedBlog(), likes: blog.likes + 1 };
      const responsedBlog = await blogsService.update(updatedBlog, blog.id);

      handleBlogUpdate(responsedBlog);
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
      </Togglable>
    </div>
  );
};

export default Blog;
