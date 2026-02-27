// style
import "./Blog.css";

const Blog = ({ blog }) => {
  return <div className="content">{blog.title}</div>;
};

export default Blog;
