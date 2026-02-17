// components
import { Link } from "react-router-dom";

// style
import "./Blog.css";

// hooks
// import { useShowNotification } from "../../../../hooks/useNotification";
// import { useDeleteBlog, useLikeBlog } from "../../../../hooks/useBlogs";

// import { messageTypes } from "../../../../reducers/notificationReducer";

const Blog = ({ blog }) => {
  //   const likeBlog = useLikeBlog();
  //   const deleteBlog = useDeleteBlog();
  //   const setNotification = useShowNotification();

  //   const handleDelete = async () => {
  //     const deleteConfirm = window.confirm(
  //       `Are you sure in deleting blog added by ${blog.user.username}`,
  //     );

  //     if (!deleteConfirm) return;

  //     try {
  //       deleteBlog(blog.id);

  //       setNotification({
  //         message: "blog deleted succesfully",
  //         type: messageTypes.INFO,
  //       });
  //     } catch (error) {
  //       console.error("deleting blog error", error);

  //       setNotification({
  //         message: "you can delete only blogs which you have created",
  //         type: messageTypes.ERROR,
  //       });
  //     }
  //   };

  

  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
    </div>
  );
};

export default Blog;
