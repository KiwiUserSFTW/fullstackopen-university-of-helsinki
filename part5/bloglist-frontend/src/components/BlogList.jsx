import { useRef, useState } from "react";

// components
import Blog from "./Blog";
import User from "./User";
import BlogForm from "./BlogForm";
import Notifier from "./Notifier/Notifier";
import Togglable from "./Togglable";

const BlogList = ({ blogs, setBlogs, user, setUser }) => {
  const [notification, setNotification] = useState({});
  const toggleLableRef = useRef(null);

  const closeBlogForm = () => {
    toggleLableRef.current.handleToggle();
  };

  if (!user) return null;
  return (
    <div>
      <h2>blogs</h2>
      <Notifier notification={notification} setNotification={setNotification} />
      <Togglable buttonLabel={"create new blog"} ref={toggleLableRef}>
        <BlogForm
          setBlogs={setBlogs}
          setNotification={setNotification}
          handleClose={closeBlogForm}
        />
      </Togglable>
      <User user={user} setUser={setUser} setNotification={setNotification} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
