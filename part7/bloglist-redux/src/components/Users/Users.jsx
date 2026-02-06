// hooks
import { useGetUsers } from "../../hooks/useUsers";

const Users = () => {
  const users = useGetUsers();

  if (!users) return <> loading ...</>;

  return (
    <table>
      <thead>
        <tr>
          <th> </th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;
