// styles
import { ListGroup, ListGroupItem } from "react-bootstrap";

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
      <h3> {user.username}</h3>
      <h4> Added blogs </h4>

      {blogsEmpty ? (
        <> No added blogs</>
      ) : (
        <ListGroup>
          {user.blogs.map((blog) => (
            <ListGroupItem
              key={blog.id}
              action
              as={Link}
              to={`/blogs/${blog.id}`}
            >
              {blog.title}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default UserView;
