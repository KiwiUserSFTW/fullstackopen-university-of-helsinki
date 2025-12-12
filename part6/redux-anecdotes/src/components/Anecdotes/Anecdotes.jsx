import AnecdoteList from "./AnecdoteList";
import AnecdoteForm from "./AnecdoteForm";

// i prefer using separate component as a page
const Anecdotes = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default Anecdotes;
