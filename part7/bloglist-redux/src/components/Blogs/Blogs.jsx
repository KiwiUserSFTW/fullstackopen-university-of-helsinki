import { useEffect } from "react";

// redux
import { useSetupBlogs } from "../../hooks/useBlogs";

// router
import Router from "../../router";

const Blogs = () => {
  const setupBlogs = useSetupBlogs();

  useEffect(() => {
    setupBlogs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <Router />
    </div>
  );
};

export default Blogs;
