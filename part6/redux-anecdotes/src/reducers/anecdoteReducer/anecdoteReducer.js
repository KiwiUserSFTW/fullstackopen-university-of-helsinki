// redux
import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../../services/anecdote";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    setVotes(state, action) {
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

const { setAnecdotes, addAnecdote, setVotes } = anecdoteSlice.actions;

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

export const appendVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote({
      ...anecdote,
      votes: Number(anecdote.votes) + 1,
    });

    dispatch(
      setVotes({ id: updatedAnecdote.id, votes: updatedAnecdote.votes })
    );
  };
};

export default anecdoteSlice.reducer;
