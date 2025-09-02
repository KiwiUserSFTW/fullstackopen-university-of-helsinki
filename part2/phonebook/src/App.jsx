// styling
import "./App.css";

// react
import { useState, useEffect } from "react";

// api
import personsService from "./services/persons";

// components
import PersonsForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Input from "./components/Input";

import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((response) => setPersons(response));
  }, []);

  if (persons.length === 0) return <> loading... </>;
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification value={message} setValue={setMessage} type="message" />
      <Input value={search} setValue={setSearch} title="filter show with: " />
      <PersonsForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <Persons persons={persons} setPersons={setPersons} search={search} />
    </div>
  );
};

export default App;
