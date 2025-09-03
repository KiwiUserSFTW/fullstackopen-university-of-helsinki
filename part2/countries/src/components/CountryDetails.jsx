const CountryDetails = ({ country }) => (
  <div>
    <h1> {country.name.official}</h1>
    <h3> region : {country.region}</h3>
    <h3> capital : {country.capital}</h3>
    <h3> area : {country.area}</h3>

    <h1>Languages</h1>
    <ul>
      {Object.values(country.languages).map((value) => (
        <li key={value}>{value}</li>
      ))}
    </ul>

    <img src={country.flags.png} alt="Flag" />
  </div>
);

export default CountryDetails;
