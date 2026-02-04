import { useEffect } from "react";

// components
import BlogList from "./BlogList/BlogList";
import LoginForm from "../LoginForm/LoginForm";

// redux
import { useSetupBlogs } from "../../hooks/useBlogs";
import { useCheckLoginInLocalStorage } from "../../hooks/useUser";

const Blogs = () => {
  const setupBlogs = useSetupBlogs();
  const checkUserInStorage = useCheckLoginInLocalStorage();

  useEffect(() => {
    setupBlogs();
    checkUserInStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <LoginForm />
      <BlogList />
    </div>
  );
};

export default Blogs;
