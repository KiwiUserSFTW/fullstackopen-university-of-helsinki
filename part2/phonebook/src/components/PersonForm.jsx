// react
import { useState } from "react";

// components
import Input from "./Input";

const PersonsForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName === "") {
      alert("set new name please");
      return;
    }
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: String(newNumber),
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  return (
    <>
      <h2> add a new </h2>
      <form>
        <Input value={newName} setValue={setNewName} title="name: " />
        <Input
          value={newNumber}
          setValue={setNewNumber}
          title="number: "
          type="tel"
        />
        <div>
          <button type="submit" onClick={handleSubmit}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonsForm;
