import { useSelector, useDispatch } from "react-redux";
import { vote } from "../../../reducers/anecdoteReducer/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(vote(id));
  };

  const filteredAnecdotes = () =>
    filter === ""
      ? anecdotes
      : anecdotes.filter((anecdote) => anecdote.content.includes(filter));

  return filteredAnecdotes()
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div className="anecdote" key={anecdote.id}>
        <div className="anecdote-content">{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
