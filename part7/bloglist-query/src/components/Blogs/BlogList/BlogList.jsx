// react & redux
import { useState } from "react";

// components
import Blog from "./Blog/Blog";
import User from "./User/User";
import BlogForm from "../BlogForm/BlogForm";
import Notifier from "../../general/Notifier/Notifier";
import Togglable from "../../general/Togglable.jsx/Togglable";

const BlogList = () => {
  const [formVisible, setVisible] = useState(false);

  const blogs = [];
  const user = null;

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
      <Notifier />
      {createButtonRender()}
      <Togglable visible={formVisible}>
        <BlogForm onClose={() => setVisible(false)} />
      </Togglable>
      <User />
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  );
};

export default BlogList;
