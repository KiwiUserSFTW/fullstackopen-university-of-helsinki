export const anecdotesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ANECDOTES":
      return action.payload;
    case "CREATE_ANECDOTE":
      return [...state, action.payload];
    default:
      return state;
  }
};

export const setAnecdotes = (anecdotes) => ({
  type: "SET_ANECDOTES",
  payload: anecdotes,
});

export const createAnecdote = (anecdote) => ({
  type: "CREATE_ANECDOTE",
  payload: anecdote,
});

export default anecdotesReducer;
