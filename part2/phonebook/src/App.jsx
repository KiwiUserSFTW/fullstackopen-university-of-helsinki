import { useState } from "react";
import PhonebookForm from "./components/phonebookForm";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);

  return (
    <div>
      <h2>Phonebook</h2>
      <PhonebookForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {persons.map((person) => (
        <h3 key={person.name}>
          {person.name} {person.number}
        </h3>
      ))}
    </div>
  );
};

export default App;
