import { useState, useEffect } from "react";

// api
import blogService from "../../services/blogs";

// components
import BlogList from "./BlogList/BlogList";
import LoginForm from "../LoginForm/LoginForm";

// redux
import { useSetupBlogs } from "../../hooks/useBlogs";

const Blogs = () => {
  const [user, setUser] = useState();

  const setupBlogs = useSetupBlogs();

  useEffect(() => {
    setupBlogs();

    const localLoggedUser = window.localStorage.getItem("loggedUser");

    if (localLoggedUser) {
      const user = JSON.parse(localLoggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <LoginForm user={user} setUser={setUser} />
      <BlogList user={user} setUser={setUser} />
    </div>
  );
};

export default Blogs;
