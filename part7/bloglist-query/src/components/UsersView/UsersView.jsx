// react & router
import { Link } from "react-router-dom";

// hooks
import { useGetUsers } from "../../hooks/useUsers";

const UsersView = () => {
  const users = useGetUsers();

  if (!users) return <> loading ...</>;

  return (
    <div className="box">
      <h2 className="title is-4">Users</h2>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
