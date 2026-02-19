// react
import { useState } from "react";

// components
import Blog from "./Blog/Blog";
import BlogForm from "./BlogForm/BlogForm";
import Togglable from "../general/Togglable.jsx/Togglable";

// hooks
import { useGetBlogs } from "../../hooks/useBlogs";
import { useGetUser } from "../../hooks/useUser";

const BlogList = () => {
  const [formVisible, setVisible] = useState(false);

  const blogs = useGetBlogs();
  const user = useGetUser();

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
      {createButtonRender()}
      <Togglable visible={formVisible}>
        <BlogForm onClose={() => setVisible(false)} />
      </Togglable>
      {blogs ? (
        blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => <Blog key={blog.id} blog={blog} user={user} />)
      ) : (
        <> loading... </>
      )}
    </div>
  );
};

export default BlogList;
