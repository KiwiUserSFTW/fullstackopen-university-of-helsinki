// reducers
import anecdoteReducer, { addAnecdote, vote } from "./anecdoteReducer";

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
