// redux
import { createSlice } from "@reduxjs/toolkit";

// api
import blogService from "../services/blogs";

const blogsReducer = createSlice({
  name: "blogs",
  initialState: null,
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
    addCommentToBlog(state, action) {
      const newBlog = action.payload;
      return state.map((blog) => (blog.id === newBlog.id ? newBlog : blog));
    },
  },
});

const { setBlogs, addBlog, removeBlog, addLikeToBlog, addCommentToBlog } =
  blogsReducer.actions;

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

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.addComment(id, comment);
      dispatch(addCommentToBlog(newBlog));
    } catch (error) {
      throw new Error("adding comment to blog failed, error - ", error);
    }
  };
};

export default blogsReducer.reducer;
