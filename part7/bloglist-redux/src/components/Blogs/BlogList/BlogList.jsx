import { useState } from "react";

// components
import Blog from "./Blog/Blog";
import User from "./User/User";
import BlogForm from "../BlogForm/BlogForm";
import Notifier from "../../general/Notifier/Notifier";
import Togglable from "../../general/Togglable.jsx/Togglable";

import { useSelector } from "react-redux";

const BlogList = ({ user, setUser }) => {
  const [formVisible, setVisible] = useState(false);

  const blogs = useSelector((state) => state.blogs);

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
      <User user={user} setUser={setUser} />
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
