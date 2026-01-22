// react & router
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// context
import AnecdoteContext from "../context/anecdotesContext";
import NotificationContext from "../context/notificationContext";

// actions
import { createAnecdote } from "../reducers/anecdotesReducer";

// hooks
import { useTextField } from "../hooks";

const CreateNew = () => {
  const content = useTextField();
  const author = useTextField();
  const info = useTextField();

  const { anecdotesDispatch } = useContext(AnecdoteContext);
  const { setNotification } = useContext(NotificationContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const randomId = Math.round(Math.random() * 10000);
    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
      id: randomId,
    };
    anecdotesDispatch(createAnecdote(newAnecdote));
    setNotification(`new anecdote ${content} created`);
    navigate("/anecdotes");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content:
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
