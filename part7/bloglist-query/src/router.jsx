import { Routes, Route } from "react-router-dom";

// components
import BlogList from "./components/BlogList/BlogList";
import UsersView from "./components/UsersView/UsersView";
import UserView from "./components/UserView/UserView";
import BlogView from "./components/BlogView/BlogView";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/blogs/:id" element={<BlogView />} />
      <Route path="/users">
        <Route index element={<UsersView />} />
        <Route path=":id" element={<UserView />} />
      </Route>
    </Routes>
  );
};

export default Router;
