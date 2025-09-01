const Numbers = ({ persons, search }) => {
  const filteredPersons = () =>
    search == ""
      ? persons
      : persons.filter((persons) =>
          persons.name.toLowerCase().includes(search.toLowerCase())
        );

  return filteredPersons().map((person) => (
    <h3 key={person.name}>
      {person.name} {person.number}
    </h3>
  ));
};

export default Numbers;
