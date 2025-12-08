import anecdoteReducer, { addAnecdote } from "./anecdoteReducer";
import { vote } from "./anecdoteReducer";
import { describe, expect, test } from "vitest";

describe("anecdote reducer", () => {
  test("anecdote can be voted", () => {
    const state = anecdoteReducer(undefined, "NO_ACTION");
    const anecdoteId = state[state.length - 1].id;

    const newState = anecdoteReducer(undefined, vote(anecdoteId));

    expect(newState[newState.length - 1].votes).toEqual(1);
  });
  test("anecdote can be created", () => {
    const state = anecdoteReducer(undefined, "NO_ACTION");

    const newState = anecdoteReducer(undefined, addAnecdote("new anecdote"));

    expect(newState.length).toEqual(state.length + 1);
  });
});
