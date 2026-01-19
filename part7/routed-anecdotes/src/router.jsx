import { Routes, Route } from "react-router-dom";

// components
import CreateNew from "./components/CreateNew";
import About from "./components/About";
import Anecdotes from "./components/Anecdotes/Anecdotes";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Anecdotes />} />
      <Route path="/create" element={<CreateNew />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default Router;
