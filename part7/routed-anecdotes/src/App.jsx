// react
import { useContext, useEffect } from "react";

// components
import Footer from "./components/Footer";
import Router from "./router";
import Menu from "./components/Menu";

// context
import AnecdotesContext from "./context/anecdotesContext";

// action creators
import { setAnecdotes } from "./reducers/anecdotesReducer";

const App = () => {
  // const [notification, setNotification] = useState("");
  const { anecdotesDispatch } = useContext(AnecdotesContext);

  useEffect(() => {
    const initAnecdotes = [
      {
        content: "If it hurts, do it more often",
        author: "Jez Humble",
        info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
        votes: 0,
        id: 1,
      },
      {
        content: "Premature optimization is the root of all evil",
        author: "Donald Knuth",
        info: "http://wiki.c2.com/?PrematureOptimization",
        votes: 0,
        id: 2,
      },
    ];
    anecdotesDispatch(setAnecdotes(initAnecdotes));
  }, [anecdotesDispatch]);
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Router />
      <Footer />
    </div>
  );
};

export default App;
