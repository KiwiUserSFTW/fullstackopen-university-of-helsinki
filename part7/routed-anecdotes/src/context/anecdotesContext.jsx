import { useReducer, createContext } from "react";
import anecdotesReducer from "../reducers/anecdotesReducer";

const AnecdotesContext = createContext();

export const AnecdotesContextProvider = (props) => {
  const [anecdotes, anecdotesDispatch] = useReducer(anecdotesReducer, []);

  return (
    <AnecdotesContext.Provider value={{ anecdotes, anecdotesDispatch }}>
      {props.children}
    </AnecdotesContext.Provider>
  );
};

export default AnecdotesContext;
