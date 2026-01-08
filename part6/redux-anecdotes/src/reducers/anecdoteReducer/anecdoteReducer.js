// redux
import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../../services/anecdote";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    vote(state, action) {
      const { id, votes } = action.payload;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) {
        anecdote.votes = votes;
      }
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const { setAnecdotes, addAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createAnecdote(content);

    dispatch(addAnecdote(anecdote));
  };
};
export const { vote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
