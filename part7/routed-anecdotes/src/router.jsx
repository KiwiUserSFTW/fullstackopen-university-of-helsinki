import { Routes, Route, Navigate } from "react-router-dom";

// components
import CreateNew from "./components/CreateNew";
import About from "./components/About";
import Anecdotes from "./components/Anecdotes/Anecdotes";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/anecdotes" />} />
      <Route path="/anecdotes" element={<Anecdotes />} />
      <Route path="/anecdotes/:id" element={<Anecdotes />} />
      <Route path="/create" element={<CreateNew />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default Router;
