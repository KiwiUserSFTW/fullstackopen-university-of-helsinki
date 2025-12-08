import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import counterReducer from "./reducers/counterReducer";

const store = createStore(counterReducer);

const App = () => {
  const { good, ok, bad } = store.getState();

  const handleClick = (e, type) => {
    e.preventDefault();
    store.dispatch({ type: type });
  };

  return (
    <div>
      <button onClick={(e) => handleClick(e, "GOOD")}>good</button>
      <button onClick={(e) => handleClick(e, "OK")}>ok</button>
      <button onClick={(e) => handleClick(e, "BAD")}>bad</button>
      <button onClick={(e) => handleClick(e, "RESET")}>reset stats</button>

      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
