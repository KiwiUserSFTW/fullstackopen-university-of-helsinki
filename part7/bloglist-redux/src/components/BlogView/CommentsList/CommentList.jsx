// styles
import { ListGroup, ListGroupItem } from "react-bootstrap";
// hooks
import { useGetBlogs } from "../../../hooks/useBlogs";

// components
import CommentForm from "./CommentForm/CommentForm";

const CommentList = ({ id }) => {
  const blogs = useGetBlogs();
  const { comments } = blogs.find((blog) => blog.id === id);

  const commentsIsEmpty = comments.length === 0;

  return (
    <div>
      <h3> comments </h3>
      <CommentForm id={id} />
      {commentsIsEmpty ? (
        <> No added comments</>
      ) : (
        <ListGroup numbered className="my-2">
          {comments.map(({ comment, id }) => (
            <ListGroupItem key={id}> {comment} </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default CommentList;
