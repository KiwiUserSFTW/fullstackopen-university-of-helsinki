// react and testing
import { render, within } from "@testing-library/react";

// TODO add to config
import userEvent from "@testing-library/user-event";

// redux and reducer
import { createStore } from "redux";
import { Provider } from "react-redux";
import anecdoteReducer from "../../reducers/anecdoteReducer";

// component
import AnecdotesList from "./AnecdotesList";

describe("anecdotes list render", () => {
  const store = createStore(anecdoteReducer);

  test("anecdotes sorted by votes", async () => {
    render(
      <Provider store={store}>
        <AnecdotesList />
      </Provider>
    );
    const [firstObj, secondObj] = store.getState();

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
});
