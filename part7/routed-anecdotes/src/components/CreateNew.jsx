// react & router
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// context
import AnecdoteContext from "../context/anecdotesContext";
import NotificationContext from "../context/notificationContext";

// actions
import { createAnecdote } from "../reducers/anecdotesReducer";

// hooks
import { useField } from "../hooks";

const CreateNew = () => {
  const [content, resetContent] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [info, resetInfo] = useField("text");

  const { anecdotesDispatch } = useContext(AnecdoteContext);
  const { setNotification } = useContext(NotificationContext);

  const formFields = [
    {
      title: "author",
      reset: resetAuthor,
      input: { ...author },
    },
    {
      title: "content",
      reset: resetContent,
      input: { ...content },
    },
    {
      title: "url for more info",
      reset: resetInfo,
      input: { ...info },
    },
  ];

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

  const handleReset = (e) => {
    e.preventDefault();

    formFields.forEach((field) => {
      field.reset();
    });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.title}>
            {field.title} :
            <input {...field.input} />
          </div>
        ))}
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
