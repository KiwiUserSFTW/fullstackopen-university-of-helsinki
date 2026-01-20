// react & router
import { useContext } from "react";
import { useMatch } from "react-router-dom";

// components
import AnecdoteList from "./AnecdoteList/AnecdoteList";

// context
import AnecdotesContext from "../../context/anecdotesContext";

// error component
const AnecdotesError = ({ match }) => {
  return match ? (
    <h3>anecdote with this id doesn&apos;t exist</h3>
  ) : (
    <h3>no anecdotes to show</h3>
  );
};

const Anecdotes = () => {
  const { anecdotes } = useContext(AnecdotesContext);

  const match = useMatch("/anecdotes/:id");

  const anecdotesList = match
    ? anecdotes.filter(({ id }) => id == Number(match.params.id))
    : anecdotes;

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

  const listIsEmpty = anecdotesList.length == 0;

  return (
    <div>
      <h2>Anecdotes</h2>
      {listIsEmpty ? (
        <AnecdotesError match={match} />
      ) : (
        <AnecdoteList anecdotes={anecdotesList} />
      )}
    </div>
  );
};

export default Anecdotes;
