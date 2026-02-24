// styles
import { ListGroup, Button } from "react-bootstrap";

// react & redux
import { useState } from "react";
import { useSelector } from "react-redux";

// components
import Blog from "./Blog/Blog";
import BlogForm from "./BlogForm/BlogForm";
import Togglable from "../general/Togglable.jsx/Togglable";

// hooks
import { useGetBlogs } from "../../hooks/useBlogs";

const BlogList = () => {
  const [formVisible, setVisible] = useState(false);

  const blogs = useGetBlogs();
  const user = useSelector((state) => state.user);

  if (!user) return null;
  if (!blogs) return <> loading ...</>;

  const createButtonRender = () => {
    if (formVisible) return null;
    return (
      <Button variant="secondary" onClick={() => setVisible(true)}>
        create new blog
      </Button>
    );
  };

  return (
    <div>
      {createButtonRender()}
      <Togglable visible={formVisible}>
        <BlogForm onClose={() => setVisible(false)} />
      </Togglable>
      <ListGroup bordered striped className="my-3">
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
      </ListGroup>
    </div>
  );
};

export default BlogList;
