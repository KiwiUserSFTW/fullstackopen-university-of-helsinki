// reducers
import anecdoteReducer from "./anecdoteReducer";

// action types
const anecdoteActionTypes = {
  addAnecdote: "anecdote/addAnecdote",
  vote: "anecdote/vote",
};

const initAnecdotes = [
  {
    content: "If it hurts, do it more often",
    id: "47145",
    votes: 14,
  },
  {
    content: "Adding manpower to a late software project makes it later!",
    id: "21149",
    votes: 1,
  },
  {
    content:
      "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    id: "69581",
    votes: 0,
  },
  {
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    id: "36975",
    votes: 1,
  },
];

describe("anecdote reducer", () => {
  test("anecdote can be voted with action anecdote/vote", () => {
    const state = anecdoteReducer(initAnecdotes, "NO_ACTION");
    const anecdote = state[state.length - 1];

    const action = {
      type: anecdoteActionTypes,
      payload: {
        id: anecdote.id,
        votes: anecdote.votes + 1,
      },
    };
    const newState = anecdoteReducer(state, action);

    expect(newState[newState.length - 1].votes).toEqual(1);
  });
  test("anecdote can be created", () => {
    const state = anecdoteReducer(initAnecdotes, "NO_ACTION");

    const newAnecdote = {
      content: "new Anecdote",
      id: "4201",
      votes: 1,
    };

    const newState = anecdoteReducer(state, {
      type: anecdoteActionTypes.addAnecdote,
      payload: newAnecdote,
    });

    // anecdote has been saved
    expect(newState.length).toEqual(state.length + 1);
    expect(newState[newState.length - 1].content).toEqual(newAnecdote.content);
  });
});
