// styles
import "./Blog.css";
import { ListGroupItem } from "react-bootstrap";

const Blog = ({ blog }) => {
  return (
    <ListGroupItem action href={`/blogs/${blog.id}`}>
      <div className="blog">{blog.title}</div>
    </ListGroupItem>
  );
};

export default Blog;
