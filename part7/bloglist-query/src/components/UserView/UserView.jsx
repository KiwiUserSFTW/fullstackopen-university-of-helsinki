// react router
import { Link, useParams } from "react-router-dom";

// hooks
import { useGetUsers } from "../../hooks/useUsers";

const UserView = () => {
  const { id } = useParams();

  const users = useGetUsers();
  if (!users) return <> loading ...</>;

  const user = users.find((user) => user.id === id);
  if (!user) return <> this user doesn't exist</>;

  const blogsEmpty = user.blogs.length < 1;

  return (
    <div>
      <h3 className="title"> {user.username}</h3>
      <h4 className="is-size-5 block"> Added blogs </h4>

      {blogsEmpty ? (
        <> No added blogs</>
      ) : (
        <div>
          {user.blogs.map((blog) => (
            <div className="card">
              <Link to={`/blogs/${blog.id}`}>
                <div className="card-content" key={blog.id}>
                  {blog.title}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserView;
