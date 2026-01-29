import { useDispatch } from "react-redux";
import { createBlog, setupBlogs } from "../reducers/blogsReducer";

export const useSetupBlogs = () => {
  const dispatch = useDispatch();

  return () => dispatch(setupBlogs());
};

export const useCreateBlog = () => {
  const dispatch = useDispatch();

  return (newBlog) => dispatch(createBlog(newBlog));
};
