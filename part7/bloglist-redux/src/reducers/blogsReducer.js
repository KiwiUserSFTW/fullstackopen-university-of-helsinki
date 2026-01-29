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
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    addLikeToBlog(state, action) {
      const id = action.payload;
      return state.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog,
      );
    },
  },
});

const { setBlogs, addBlog, removeBlog, addLikeToBlog } = blogsReducer.actions;

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

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteOne(id);
      dispatch(removeBlog(id));
    } catch (error) {
      throw new Error("deleting blog failed, error - ", error);
    }
  };
};

export const likeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.like(id);
      dispatch(addLikeToBlog(id));
    } catch (error) {
      throw new Error("liking blog failed, error - ", error);
    }
  };
};

export default blogsReducer.reducer;
