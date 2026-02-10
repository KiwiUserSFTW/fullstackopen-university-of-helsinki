// router
import Router from "../../router";

// components
import UserStatus from "./UserStatus/UserStatus";

const Blogs = () => {
  return (
    <div>
      <h2>blogs</h2>
      <UserStatus />
      <Router />
    </div>
  );
};

export default Blogs;
