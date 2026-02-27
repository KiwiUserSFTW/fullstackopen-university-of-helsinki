// react
import { useState } from "react";

// components
import Blog from "./Blog/Blog";
import BlogForm from "./BlogForm/BlogForm";
import Togglable from "../general/Togglable.jsx/Togglable";

// hooks
import { useGetBlogs } from "../../hooks/useBlogs";
import { useGetUser } from "../../hooks/useUser";

// router
import { Link } from "react-router-dom";

const BlogList = () => {
  const [formVisible, setVisible] = useState(false);

  const blogs = useGetBlogs();
  const user = useGetUser();

  if (!user) return null;

  const createButtonRender = () => {
    if (formVisible) return null;
    return (
      <div className="control block">
        <button
          className="button has-text-primary-35"
          onClick={() => setVisible(true)}
        >
          create new blog
        </button>
      </div>
    );
  };

  return (
    <div>
      {createButtonRender()}
      <div className="block">
        <Togglable visible={formVisible}>
          <BlogForm onClose={() => setVisible(false)} />
        </Togglable>
      </div>
      {blogs ? (
        blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id} className="card">
              <Link to={`/blogs/${blog.id}`}>
                <div className="card-content">
                  <Blog blog={blog} />
                </div>
              </Link>
            </div>
          ))
      ) : (
        <> loading... </>
      )}
    </div>
  );
};

export default BlogList;
