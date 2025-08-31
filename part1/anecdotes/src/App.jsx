// react
import { useState } from "react";

// styles
import "./App.css";

// components
const Anecdote = ({ anecdote, votes = 0, title }) => {
  return (
    <div className="anecdote">
      <h1> {title} </h1>
      <h2>{anecdote} </h2>
      <p>has {votes} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const getRandomInt = (max = anecdotes.length) => {
    return Math.floor(Math.random() * max);
  };

  const [selected, setSelected] = useState(getRandomInt());
  const [votes, setVotes] = useState({});

  const votesIsEmpty = Object.keys(votes).length === 0;

  const getMostVotedAnegdoteId = () => {
    return Object.keys(votes).reduce((mostVotedId, id) => {
      if (votes[id] > votes[mostVotedId]) return id;
      return mostVotedId;
    });
  };

  const handleNewVote = (id) => () => {
    let newVotes = {};
    if (votes[id] !== undefined) {
      newVotes = { ...votes, [id]: votes[id] + 1 };
    } else {
      newVotes = { ...votes, [id]: 1 };
    }

    setVotes(newVotes);
  };

  const handleNextAnecdote = () => {
    setSelected(getRandomInt());
  };

  return (
    <div>
      <Anecdote
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
        title={"Anecdote of the day"}
      />
      <button onClick={handleNewVote(selected)}> vote </button>
      <button onClick={handleNextAnecdote}> next anecdote </button>

      {votesIsEmpty ? (
        <h1> no votes yet </h1>
      ) : (
        <Anecdote
          anecdote={anecdotes[getMostVotedAnegdoteId()]}
          votes={votes[getMostVotedAnegdoteId()]}
          title={"Anecdote with most votes"}
        />
      )}
    </div>
  );
};

export default App;
