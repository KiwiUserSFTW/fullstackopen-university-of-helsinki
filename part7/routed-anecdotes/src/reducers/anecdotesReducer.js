export const anecdotesReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_ANECDOTES":
      return action.payload;
    default:
      return state;
  }
};

export const setAnecdotes = (anecdotes) => ({
  type: "SET_ANECDOTES",
  payload: anecdotes,
});

export default anecdotesReducer;
