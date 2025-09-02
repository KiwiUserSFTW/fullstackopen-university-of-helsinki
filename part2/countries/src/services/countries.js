import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getData = (promiseAction) =>
  promiseAction.then((response) => response.data);

const getAll = () => getData(axios.get(`${baseUrl}/all`));
const getExactly = (name) => getData(axios.get(`${baseUrl}/name/${name}`));

export default { getAll, getExactly };
