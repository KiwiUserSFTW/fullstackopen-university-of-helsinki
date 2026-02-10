import { useEffect } from "react";

// redux
import { useSetupBlogs } from "../../hooks/useBlogs";

// router
import Router from "../../router";

// components
import UserStatus from "./UserStatus/UserStatus";

const Blogs = () => {
  const setupBlogs = useSetupBlogs();

  useEffect(() => {
    setupBlogs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <UserStatus />
      <Router />
    </div>
  );
};

export default Blogs;
