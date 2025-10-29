import { useState, useEffect } from "react";

// api
import blogService from "../services/blogs";

// components
import BlogList from "./BlogList";
import LoginForm from "./LoginForm";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const localLoggedUser = window.localStorage.getItem("loggedUser");
    if (localLoggedUser) {
      const user = JSON.parse(localLoggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <LoginForm user={user} setUser={setUser} />
      <BlogList
        user={user}
        setUser={setUser}
        blogs={blogs}
        setBlogs={setBlogs}
      />
    </div>
  );
};

export default Blogs;
