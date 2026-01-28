import { useState } from "react";

// components
import Blog from "./Blog/Blog";
import User from "./User/User";
import BlogForm from "../BlogForm/BlogForm";
import Notifier from "../../general/Notifier/Notifier";
import Togglable from "../../general/Togglable.jsx/Togglable";

const BlogList = ({ blogs, setBlogs, user, setUser }) => {
  const [notification, setNotification] = useState({});
  const [formVisible, setVisible] = useState(false);

  if (!user) return null;
  const createButtonRender = () => {
    if (formVisible) return null;
    return (
      <button className="labelButton" onClick={() => setVisible(true)}>
        create new blog
      </button>
    );
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notifier notification={notification} setNotification={setNotification} />
      {createButtonRender()}
      <Togglable visible={formVisible}>
        <BlogForm
          setBlogs={setBlogs}
          setNotification={setNotification}
          onClose={() => setVisible(false)}
        />
      </Togglable>
      <User user={user} setUser={setUser} setNotification={setNotification} />
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            setBlogs={setBlogs}
            setNotification={setNotification}
          />
        ))}
    </div>
  );
};

export default BlogList;
