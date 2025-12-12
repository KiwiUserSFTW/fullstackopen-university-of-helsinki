import AnecdoteList from "./components/Anecdotes/AnecdoteList";
import AnecdoteForm from "./components/Anecdotes/AnecdoteForm";
// import Anecdotes from "./components/Anecdotes/Anecdotes";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
