import deepFreeze from "deep-freeze";

// reducers
import filterReducer, { setFilter } from "./filterReducer";

describe("filter reducer", () => {
  test("filter can be changed", () => {
    const state = filterReducer(undefined, "NO_ACTION");

    // assure initial filter value is empty
    expect(state).toEqual("");

    const value = "new value";
    const newState = filterReducer(undefined, setFilter(value));

    // immutability check
    deepFreeze(state);

    expect(newState).toEqual(value);
  });
});
