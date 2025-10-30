import { useState } from "react";

// components
import Blog from "./Blog";
import User from "./User";
import BlogForm from "./BlogForm";
import Notifier from "./Notifier/Notifier";

const BlogList = ({ blogs, setBlogs, user, setUser }) => {
  const [notification, setNotification] = useState({});
  if (!user) return null;
  return (
    <div>
      <h2>blogs</h2>
      <Notifier notification={notification} setNotification={setNotification} />
      <BlogForm setBlogs={setBlogs} setNotification={setNotification} />
      <User user={user} setUser={setUser} setNotification={setNotification} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
