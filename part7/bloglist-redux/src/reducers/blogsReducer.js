// redux
import { createSlice } from "@reduxjs/toolkit";

// api
import blogService from "../services/blogs";

const blogsReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return [...state, action.payload];
    },
  },
});

const { setBlogs, addBlog } = blogsReducer.actions;

export const setupBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      throw new Error("getting blogs failed, error - ", error);
    }
  };
};

export const createBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create({ title, author, url });
      dispatch(addBlog(createdBlog));
    } catch (error) {
      throw new Error("creating new blog failed, error - ", error);
    }
  };
};
export default blogsReducer.reducer;
