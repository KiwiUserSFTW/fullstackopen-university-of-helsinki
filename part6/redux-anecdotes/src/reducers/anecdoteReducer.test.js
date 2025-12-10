import deepFreeze from "deep-freeze";

// reducers
import anecdoteReducer, { addAnecdote, vote } from "./anecdoteReducer";

describe("anecdote reducer", () => {
  test("anecdote can be voted", () => {
    const state = anecdoteReducer(undefined, "NO_ACTION");
    const anecdoteId = state[state.length - 1].id;

    // immutability check
    deepFreeze(state);

    const newState = anecdoteReducer(undefined, vote(anecdoteId));

    expect(newState[newState.length - 1].votes).toEqual(1);
  });
  test("anecdote can be created", () => {
    const state = anecdoteReducer(undefined, "NO_ACTION");

    const newAnecdoteContent = "new anecdote";

    const newState = anecdoteReducer(
      undefined,
      addAnecdote(newAnecdoteContent)
    );

    // immutability check
    deepFreeze(state);

    // anecdote has been saved
    expect(newState.length).toEqual(state.length + 1);
    expect(newState[newState.length - 1].content).toEqual(newAnecdoteContent);
  });
});
