import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../../../reducers/notificationReducer/notificationHelper";

// reducer
import { vote } from "../../../reducers/anecdoteReducer/anecdoteReducer";

// service
import anecdoteService from "../../../services/anecdote";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const handleVote = async (id, content, votes) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote({
      id,
      votes: Number(votes) + 1,
    });

    dispatch(vote({ id: updatedAnecdote.id, votes: updatedAnecdote.votes }));
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
