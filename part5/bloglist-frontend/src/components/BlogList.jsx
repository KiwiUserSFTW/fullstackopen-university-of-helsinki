// components
import Blog from "./Blog";
import User from "./User";
import BlogForm from "./BlogForm";

const BlogList = ({ blogs, setBlogs, user, setUser }) => {
  if (!user) return null;
  return (
    <div>
      <h2>blogs</h2>
      <BlogForm setBlogs={setBlogs} />
      <User user={user} setUser={setUser} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
