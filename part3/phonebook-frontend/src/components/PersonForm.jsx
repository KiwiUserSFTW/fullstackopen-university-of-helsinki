// react
import { useState } from "react";

// components
import Input from "./Input";

// api
import personsService from "../services/persons";

const PersonsForm = ({ persons, setPersons, setMessage, setMessageType }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleMessage = (type, message) => {
    setMessageType(type);
    setMessage(message);
  };
  const updatePerson = (existingPerson) => {
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
          handleMessage(
            "message",
            `${newName} number has been changed to ${newNumber}`
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          handleMessage("error", error.response.data.error);
          if (error.response.status === 500) {
            handleMessage(
              "error",
              `Information of ${newName} has already been removed from server`
            );
            setPersons(persons.filter((p) => p.id !== changedPerson.id));
          }
        });
    }
  };

  const addNewPerson = () => {
    const newPerson = {
      name: newName,
      number: String(newNumber),
    };

    personsService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        handleMessage("message", `Added ${newName}`);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log(error);
        handleMessage("error", error.response.data.error);
      });
  };

  const validate = () => {
    if (newName === "") {
      alert("set new name please");
      return false;
    }
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const validated = validate();

    if (!validated) return;

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson !== undefined) {
      updatePerson(existingPerson);
      return;
    }

    addNewPerson();
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
