// styles
import "./Blog.css";
import { ListGroupItem } from "react-bootstrap";

// react & router
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <ListGroupItem action as={Link} to={`/blogs/${blog.id}`}>
      <div className="blog">{blog.title}</div>
    </ListGroupItem>
  );
};

export default Blog;
