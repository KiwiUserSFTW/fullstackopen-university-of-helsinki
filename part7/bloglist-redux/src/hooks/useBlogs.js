import { useDispatch } from "react-redux";
import {
  createBlog,
  deleteBlog,
  likeBlog,
  setupBlogs,
} from "../reducers/blogsReducer";

export const useSetupBlogs = () => {
  const dispatch = useDispatch();

  return () => dispatch(setupBlogs());
};

export const useCreateBlog = () => {
  const dispatch = useDispatch();

  return (newBlog) => dispatch(createBlog(newBlog));
};

export const useDeleteBlog = () => {
  const dispatch = useDispatch();

  return (id) => dispatch(deleteBlog(id));
};

export const useLikeBlog = () => {
  const dispatch = useDispatch();

  return (id) => dispatch(likeBlog(id));
};
