import { useSelector, useDispatch } from "react-redux";
import { vote } from "../../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleVote = (id) => {
    dispatch(vote(id));
  };

  return anecdotes
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
