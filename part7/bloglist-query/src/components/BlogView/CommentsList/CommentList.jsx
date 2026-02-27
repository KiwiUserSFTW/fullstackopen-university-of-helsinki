// hooks
import { useGetBlogs } from "../../../hooks/useBlogs";

// components
import CommentForm from "./CommentForm/CommentForm";

const CommentList = ({ id }) => {
  const blogs = useGetBlogs();
  const { comments } = blogs.find((blog) => blog.id === id);

  const commentsIsEmpty = comments.length === 0;

  return (
    <div className="block content">
      <h3 className="is-size-3"> comments </h3>
      <CommentForm id={id} />
      {commentsIsEmpty ? (
        <> No added comments</>
      ) : (
        <div className="my-4">
          <ul>
            {comments.map(({ comment, id }) => (
              <li key={id}> {comment} </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommentList;
