const CountriesList = ({ countries, setCountry }) => {
  const handleClick = (country) => () => {
    setCountry(country);
  };

  return countries.map((country) => (
    <div key={country.name.common}>
      <p> {country.name.common}</p>
      <button onClick={handleClick(country)}> show </button>
    </div>
  ));
};
export default CountriesList;
