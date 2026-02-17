import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const config = () => ({ headers: { Authorization: token } });

const setToken = (value) => {
  token = `Bearer ${value}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config());
  return response.data;
};

const update = async (updatedBlog, id) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config());
    return response.data;
  } catch (error) {
    console.error("update failed:", error.response.data);
    throw error;
  }
};

const like = async (id) => {
  try {
    await axios.put(`${baseUrl}/like/${id}`, null, config());
  } catch (error) {
    console.error("liking blog failed:", error.response.data);
    throw error;
  }
};

const addComment = async (id, comment) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
    return response.data;
  } catch (error) {
    console.error("add comment failed:", error.response.data);
    throw error;
  }
};

const deleteOne = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`, config());
  } catch (error) {
    console.error("deleting failed:", error.response.data);
    throw error;
  }
};

export default {
  getAll,
  setToken,
  create,
  update,
  deleteOne,
  like,
  addComment,
};
