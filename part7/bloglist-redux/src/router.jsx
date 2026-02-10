import { Routes, Route } from "react-router-dom";

// components
import BlogList from "./components/Blogs/BlogList/BlogList";
import UsersView from "./components/UsersView/UsersView";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/users" element={<UsersView />} />
    </Routes>
  );
};

export default Router;
