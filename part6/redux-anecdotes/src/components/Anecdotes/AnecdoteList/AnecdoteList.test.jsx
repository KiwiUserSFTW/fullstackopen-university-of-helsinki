// react and testing
import { render, within, screen } from "@testing-library/react";

// TODO add to config
import userEvent from "@testing-library/user-event";

// redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// reducers
import anecdoteReducer from "../../../reducers/anecdoteReducer/anecdoteReducer";
import filterReducer from "../../../reducers/filterReducer/filterReducer";

// component
import AnecdoteList from "./AnecdoteList";
import Filter from "../Filter/Filter";

describe("anecdotes list render", () => {
  test("anecdotes sorted by votes", async () => {
    const store = configureStore({
      reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
      },
    });
    render(
      <Provider store={store}>
        <AnecdoteList />
      </Provider>
    );
    const [firstObj, secondObj] = store.getState().anecdotes;

    const getAnecdotes = () => [...document.querySelectorAll(".anecdote")];

    const checkOrder = (first, second) => {
      expect(first).toHaveTextContent(firstObj.content);
      expect(second).toHaveTextContent(secondObj.content);
    };

    // anecdotes
    let [firstAnecdote, secondAnecdote] = getAnecdotes();

    // assure in initial order
    checkOrder(firstAnecdote, secondAnecdote);

    // voting
    await userEvent
      .setup()
      .click(within(secondAnecdote).getByRole("button", { name: "vote" }));

    // anecdotes
    [firstAnecdote, secondAnecdote] = getAnecdotes();

    // order should be changed
    checkOrder(secondAnecdote, firstAnecdote);
  });
  test("anecdotes filtering correctly", async () => {
    const initialAnecdotesState = [
      {
        id: 1,
        votes: 0,
        content:
          "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      },
      {
        id: 2,
        votes: 1,
        content: "Premature optimization is the root of all evil.",
      },
      {
        id: 3,
        votes: 0,
        content:
          "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      },
    ];
    const store = configureStore({
      reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
      },
      preloadedState: {
        anecdotes: initialAnecdotesState,
        filter: "",
      },
    });

    render(
      <Provider store={store}>
        <>
          <Filter />
          <AnecdoteList />
        </>
      </Provider>
    );
    const getAnecdotes = () => [...document.querySelectorAll(".anecdote")];

    expect(getAnecdotes().length).toEqual(initialAnecdotesState.length);

    // type new value in filter
    const user = userEvent.setup();
    const filterInput = screen.getByLabelText(/filter/);

    await user.type(filterInput, "first");

    expect(getAnecdotes().length).toEqual(2);
  });
});
