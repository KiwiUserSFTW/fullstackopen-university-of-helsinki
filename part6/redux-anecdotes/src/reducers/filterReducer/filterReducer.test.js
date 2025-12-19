// reducers
import filterReducer, { setFilter } from "./filterReducer";

describe("filter reducer", () => {
  test("filter can be changed with action filter/setFilter", () => {
    const state = filterReducer(undefined, "NO_ACTION");

    // assure initial filter value is empty
    expect(state).toEqual("");

    const value = "new value";
    const newState = filterReducer(undefined, setFilter(value));

    expect(newState).toEqual(value);
  });
});
