// styles
import "./BlogView.css";

// react
import { useParams } from "react-router-dom";

// hooks
import { useGetBlogs, useLikeBlog } from "../../hooks/useBlogs";
import { useShowNotification } from "../../hooks/useNotification";

// types
import { messageTypes } from "../../reducers/notificationReducer";

// components
import CommentList from "./CommentsList/CommentList";

const BlogView = () => {
  const { id } = useParams();

  const likeBlog = useLikeBlog();
  const setNotification = useShowNotification();

  const blogs = useGetBlogs();
  if (!blogs) return <> loading ...</>;

  const blog = blogs.find((blog) => blog.id === id);
  if (!blog) return <> this blog doesn't exist</>;

  const handleLike = async () => {
    try {
      likeBlog(blog.id);
      setNotification({
        message: `${blog.title} liked`,
        type: messageTypes.INFO,
      });
    } catch (error) {
      console.error("like adding error", error);
      setNotification({
        message: "like adding error",
        type: messageTypes.ERROR,
      });
    }
  };

  return (
    <div>
      <h1> {blog.title}</h1>

      <div className="details">
        <a href={blog.url}>{blog.url}</a>
        <div>
          <span>Likes: {blog.likes}</span>
          <button onClick={handleLike}> like </button>
        </div>
        <div>added by {blog.user.username}</div>
      </div>

      <CommentList id={id} />
    </div>
  );
};

export default BlogView;
