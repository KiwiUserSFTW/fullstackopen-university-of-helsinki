// react
import { useState, useEffect } from "react";

// api
import personsService from "./services/persons";

// components
import PersonsForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Input from "./components/Input";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    personsService.getAll().then((response) => setPersons(response));
  }, []);

  if (persons.length === 0) return <> loading... </>;
  return (
    <div>
      <h2>Phonebook</h2>
      <Input value={search} setValue={setSearch} title="filter show with: " />
      <PersonsForm persons={persons} setPersons={setPersons} />
      <Persons persons={persons} setPersons={setPersons} search={search} />
    </div>
  );
};

export default App;
