import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  createBlog,
  deleteBlog,
  likeBlog,
  setupBlogs,
  addComment,
} from "../reducers/blogsReducer";

export const useGetBlogs = () => {
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!blogs) {
      dispatch(setupBlogs());
    }
  }, [blogs, dispatch]);

  return blogs;
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

export const useAddComment = () => {
  const dispatch = useDispatch();

  return (id, comment) => dispatch(addComment(id, comment));
};
