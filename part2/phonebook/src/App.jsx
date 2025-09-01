// react
import { useState } from "react";

// components
import PhonebookForm from "./components/phonebookForm";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter show with: <input value={search} onChange={handleSearchChange} />
      </div>
      <h2> add a new </h2>
      <PhonebookForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Numbers persons={persons} search={search} />
    </div>
  );
};

export default App;
