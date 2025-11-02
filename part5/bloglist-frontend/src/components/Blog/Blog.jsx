import { useState } from "react";

// components
import Togglable from "../Togglable";

// style
import "./Blog.css";

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div className="blog">
      <div>
        {blog.title}
        {detailsVisible ? (
          <button onClick={() => setDetailsVisible(false)}> hide </button>
        ) : (
          <button onClick={() => setDetailsVisible(true)}> show </button>
        )}
      </div>
      <Togglable visible={detailsVisible}>
        <div className="details">
          <span>Author: {blog.author}</span>
          <span>
            Likes: {blog.likes} <button> like </button>
          </span>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
