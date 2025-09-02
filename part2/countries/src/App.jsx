// react
import { useState, useEffect } from "react";

// styling
import "./App.css";

// api
import countriesService from "./services/countries";

const Country = ({ country }) => (
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

const Countries = ({ search, countries }) => {
  const [filteredCountries, setFilteredCountries] = useState(null);

  useEffect(() => {
    const filteredCountries =
      search === ""
        ? setFilteredCountries(countries)
        : countries.filter(
            (c) =>
              c.name.common.toLowerCase().includes(search.toLowerCase()) ||
              c.name.official.toLowerCase().includes(search.toLowerCase())
          );

    setFilteredCountries(filteredCountries);
  }, [search, countries]);

  if (!filteredCountries || filteredCountries.length < 1)
    return <h1> no mathing </h1>;
  if (filteredCountries.length >= 10) return <h1> too many countries </h1>;

  return filteredCountries.length === 1 ? (
    <Country search={search} country={filteredCountries[0]} />
  ) : (
    filteredCountries.map((country) => (
      <p key={country.name.common}> {country.name.common}</p>
    ))
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((data) => setCountries(data));
  }, []);

  if (!countries) return <p>loading...</p>;
  return (
    <>
      find countries{": "}
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Countries search={search} countries={countries} />
    </>
  );
};

export default App;
