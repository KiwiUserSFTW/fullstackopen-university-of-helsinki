import Anecdotes from "./components/Anecdotes";

const App = () => {

  const vote = (id) => {
    console.log("vote", id);
  };

  return <Anecdotes />;
};

export default App;
