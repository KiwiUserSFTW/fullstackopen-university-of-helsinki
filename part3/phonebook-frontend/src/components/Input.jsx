// react
const Input = ({ value, setValue, title, type = "string" }) => {
  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  return (
    <div>
      {title}
      <input value={value} onChange={handleSearchChange} type={type} />
    </div>
  );
};

export default Input;
