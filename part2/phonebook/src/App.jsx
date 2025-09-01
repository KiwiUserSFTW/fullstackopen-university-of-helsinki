import { useState } from "react";
import PhonebookForm from "./components/phonebookForm";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <PhonebookForm
        newName={newName}
        setNewName={setNewName}
        persons={persons}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <h3 key={person.name}> {person.name}</h3>
      ))}
    </div>
  );
};

export default App;
