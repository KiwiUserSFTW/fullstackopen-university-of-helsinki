// reducers
import anecdoteReducer, { addAnecdote, vote } from "./anecdoteReducer";

// const initAnecdotes = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

describe("anecdote reducer", () => {
  test("anecdote can be voted with action anecdote/vote", () => {
    const state = anecdoteReducer(undefined, "NO_ACTION");
    const anecdoteId = state[state.length - 1].id;

    const newState = anecdoteReducer(state, vote(anecdoteId));

    expect(newState[newState.length - 1].votes).toEqual(1);
  });
  test("anecdote can be created", () => {
    const state = anecdoteReducer(undefined, "NO_ACTION");

    const newAnecdoteContent = "new anecdote";

    const newState = anecdoteReducer(
      undefined,
      addAnecdote(newAnecdoteContent)
    );

    // anecdote has been saved
    expect(newState.length).toEqual(state.length + 1);
    expect(newState[newState.length - 1].content).toEqual(newAnecdoteContent);
  });
});
