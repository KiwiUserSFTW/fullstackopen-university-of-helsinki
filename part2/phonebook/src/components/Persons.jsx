// api
import personsService from "../services/persons";

const Persons = ({ persons, setPersons, search }) => {
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
      .then((deletedPerson) => {
        setPersons(persons.filter((p) => p.id !== deletedPerson.id));
      })
      .catch((error) => {
        alert(`the person '${personName}' doesn't exist on server`);
        setPersons(persons.filter((p) => p.id !== personId));
        throw new Error(error);
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
