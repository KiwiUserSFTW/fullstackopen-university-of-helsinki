import { useContext } from "react";

// components
import AnecdoteList from "./AnecdoteList/AnecdoteList";

// context
import AnecdotesContext from "../../context/anecdotesContext";

const Anecdotes = () => {
  const { anecdotes } = useContext(AnecdotesContext);

  /*
  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };
*/

  return <AnecdoteList anecdotes={anecdotes} />;
};

export default Anecdotes;
