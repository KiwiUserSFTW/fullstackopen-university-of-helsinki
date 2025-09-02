// react
import { useState } from "react";

// components
import Input from "./Input";

// api
import personsService from "../services/persons";

const PersonsForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName === "") {
      alert("set new name please");
      return;
    }

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {
        const changedPerson = { ...existingPerson, number: newNumber };
        personsService
          .change(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === returnedPerson.id ? returnedPerson : p
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: String(newNumber),
    };

    personsService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
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
