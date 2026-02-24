// styles
import { Table } from "react-bootstrap";

// react & router
import { Link } from "react-router-dom";

// hooks
import { useGetUsers } from "../../hooks/useUsers";

const UsersView = () => {
  const users = useGetUsers();

  if (!users) return <> loading ...</>;

  return (
    <div>
      <h2>Users</h2>
      <Table striped className="fs-4">
        <thead>
          <tr>
            <th> user </th>
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
      </Table>
    </div>
  );
};

export default UsersView;
