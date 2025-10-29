import { useState, useEffect } from "react";

// api
import blogService from "../services/blogs";

// components
import BlogList from "./BlogList";
import LoginForm from "./LoginForm";
import User from "./User";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const localLoggedUser = window.localStorage.getItem("loggedUser");
    if (localLoggedUser) {
      setUser(JSON.parse(localLoggedUser));
    }
  }, []);

  return (
    <div>
      <LoginForm user={user} setUser={setUser} />
      <BlogList user={user} blogs={blogs} />
    </div>
  );
};

export default Blogs;
