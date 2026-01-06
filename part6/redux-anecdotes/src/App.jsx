// react
import { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";

// reducer
import { initializeAnecdotes } from "./reducers/anecdoteReducer/anecdoteReducer.js";

// components
import AnecdoteList from "./components/Anecdotes/AnecdoteList/AnecdoteList";
import AnecdoteForm from "./components/Anecdotes/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Anecdotes/Filter/Filter";

// import Anecdotes from "./components/Anecdotes/Anecdotes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  });
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
