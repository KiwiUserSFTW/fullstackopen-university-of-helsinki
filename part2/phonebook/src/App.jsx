// react
import { useState, useEffect } from "react";

// api
import axios from "axios";

// components
import PersonsForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Input from "./components/Input";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  if (persons.length === 0) return <> loading... </>;
  return (
    <div>
      <h2>Phonebook</h2>
      <Input value={search} setValue={setSearch} title="filter show with: " />
      <PersonsForm persons={persons} setPersons={setPersons} />
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;
