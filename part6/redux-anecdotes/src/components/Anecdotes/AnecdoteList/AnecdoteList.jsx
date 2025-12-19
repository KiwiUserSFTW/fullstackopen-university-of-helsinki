import { useSelector, useDispatch } from "react-redux";
import { vote } from "../../../reducers/anecdoteReducer/anecdoteReducer";
import { showNotification } from "../../../reducers/notificationReducer/notificationHelper";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const handleVote = (id, content) => {
    dispatch(vote(id));
    showNotification(dispatch, `You voted ${content}`);
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
          <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
            vote
          </button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
