// api
import personsService from "../services/persons";

const Persons = ({
  persons,
  setPersons,
  search,
  setMessage,
  setMessageType,
}) => {
  const filteredPersons = () =>
    search == ""
      ? persons
      : persons.filter((persons) =>
          persons.name.toLowerCase().includes(search.toLowerCase())
        );

  const handleDelete = (personId, personName) => () => {
    if (!window.confirm(`Delete ${personName} ?`)) return;

    personsService
      .deletePerson(personId)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== personId));
        setMessageType("message");
        setMessage(`Information of ${personName} has been removed !`);
      })
      .catch(() => {
        setMessageType("error");
        setMessage(
          `Information of ${personName} has been already removed from the server`
        );

        setPersons(persons.filter((p) => p.id !== personId));
      });
  };

  return (
    <>
      <h2>Numbers</h2>
      {filteredPersons().map((person) => (
        <h3 key={person.name}>
          {person.name} {person.number}
          <button onClick={handleDelete(person.id, person.name)}>delete</button>
        </h3>
      ))}
    </>
  );
};

export default Persons;
