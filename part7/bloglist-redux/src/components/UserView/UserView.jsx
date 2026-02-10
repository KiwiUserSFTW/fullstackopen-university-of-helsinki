// hooks
import { useParams } from "react-router-dom";
import { useGetUsers } from "../../hooks/useUsers";

const UserView = () => {
  const { id } = useParams();

  const users = useGetUsers();
  if (!users) return <> loading ...</>;

  const user = users.find((user) => user.id === id);
  if (!user) return <> this user doesn't exist</>;

  const blogsEmpty = user.blogs.length > 1;

  return (
    <div>
      <h3> {user.username}</h3>
      <h4> Added blogs </h4>

      {blogsEmpty ? (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}> {blog.title} </li>
          ))}
        </ul>
      ) : (
        <> No added blogs</>
      )}
    </div>
  );
};

export default UserView;
