// components
import AnecdoteList from "./components/Anecdotes/AnecdoteList/AnecdoteList";
import AnecdoteForm from "./components/Anecdotes/AnecdoteForm";
import Filter from "./components/Anecdotes/Filter/Filter";

// import Anecdotes from "./components/Anecdotes/Anecdotes";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
