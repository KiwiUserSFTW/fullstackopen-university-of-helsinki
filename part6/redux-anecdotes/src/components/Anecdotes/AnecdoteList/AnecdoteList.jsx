import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../../../reducers/notificationReducer/notificationReducer";

// reducer
import { appendVote } from "../../../reducers/anecdoteReducer/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const handleVote = async (id, content, votes) => {
    dispatch(appendVote({ id, votes }));
    dispatch(showNotification(`You voted ${content}`, 5));
  };

  const filteredAnecdotes = () =>
    filter === ""
      ? anecdotes.slice()
      : anecdotes.filter((anecdote) => anecdote.content.includes(filter));

  return filteredAnecdotes()
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div className="anecdote" key={anecdote.id}>
        <div className="anecdote-content">{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button
            onClick={() =>
              handleVote(anecdote.id, anecdote.content, anecdote.votes)
            }
          >
            vote
          </button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
