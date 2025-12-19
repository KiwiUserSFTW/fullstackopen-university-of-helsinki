import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../../reducers/anecdoteReducer/anecdoteReducer";
import { showNotification } from "../../reducers/notificationReducer/notificationHelper";

const NewAnecdoteForm = () => {
  const [anecdoteValue, setAnecdoteValue] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addAnecdote(anecdoteValue));
    setAnecdoteValue("");
    showNotification(
      dispatch,
      `anecdote - ${anecdoteValue} has been created !`
    );
  };

  return (
    <>
      <h2>create new</h2>
      <form>
        <div>
          <input
            value={anecdoteValue}
            onChange={(e) => setAnecdoteValue(e.target.value)}
          />
        </div>
        <button onClick={(e) => handleClick(e)}>create</button>
      </form>
    </>
  );
};

export default NewAnecdoteForm;
