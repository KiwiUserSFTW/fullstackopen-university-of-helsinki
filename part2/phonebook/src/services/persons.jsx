// api
import axios from "axios";

// functions
const getData = (promiseAction) =>
  promiseAction.then((response) => response.data);
const baseUrl = "http://localhost:3001/persons";

const getAll = () => getData(axios.get(baseUrl));

const create = (newPerson) => getData(axios.post(baseUrl, newPerson));

const change = (personId, changedPerson) =>
  getData(axios.put(`${baseUrl}/${personId}`, changedPerson));

const deletePerson = (personId) =>
  getData(axios.delete(`${baseUrl}/${personId}`));

export default { getAll, create, change, deletePerson };
