import { Routes, Route } from "react-router-dom";

// components
import BlogList from "./components/Blogs/BlogList/BlogList";
import Users from "./components/Users/Users";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};

export default Router;
