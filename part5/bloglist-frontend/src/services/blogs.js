import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (value) => {
  token = value;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll, setToken };
