import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (value) => {
  token = `Bearer ${value}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config.headers)
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

export default { getAll, setToken, create };
