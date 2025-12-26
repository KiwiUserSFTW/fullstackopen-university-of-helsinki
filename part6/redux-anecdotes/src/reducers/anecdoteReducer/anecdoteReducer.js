// redux
import { createSlice } from "@reduxjs/toolkit";

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

export const { vote, addAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
