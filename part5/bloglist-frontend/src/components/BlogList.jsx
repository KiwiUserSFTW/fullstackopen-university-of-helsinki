import Blog from "./Blog";
import User from "./User"
const BlogList = ({ blogs, user }) => {
  if (!user) return null;
  return (
    <div>
      <h2>blogs</h2>
      <User user={user} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
