const Persons = ({ persons, search }) => {
  const filteredPersons = () =>
    search == ""
      ? persons
      : persons.filter((persons) =>
          persons.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <>
      <h2>Numbers</h2>
      {filteredPersons().map((person) => (
        <h3 key={person.name}>
          {person.name} {person.number}
        </h3>
      ))}
    </>
  );
};

export default Persons;
