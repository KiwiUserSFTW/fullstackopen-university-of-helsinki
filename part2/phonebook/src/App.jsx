// react
import { useState } from "react";

// components
import PersonsForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Input from "./components/Input";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [search, setSearch] = useState("");

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
