const PhonebookForm = ({ newName, setNewName, persons, setPersons }) => {
  const handleChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      // id: String(persons.length + 1),
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleChange} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
};

export default PhonebookForm;
