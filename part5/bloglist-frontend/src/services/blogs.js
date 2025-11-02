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

const deleteOne = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config());
    return response.data;
  } catch (error) {
    console.error("deleting failed:", error.response.data);
    throw error;
  }
};

export default { getAll, setToken, create, update, deleteOne };
