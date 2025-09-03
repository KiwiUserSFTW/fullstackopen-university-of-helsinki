// react
import { useEffect, useState } from "react";

// components
import CountryDetails from "./CountryDetails";
import CountriesList from "./CountriesList";

const Countries = ({ search, countries }) => {
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    setCountry(null);
    const filteredCountries =
      search === ""
        ? countries
        : countries.filter(
            (c) =>
              c.name.common.toLowerCase().includes(search.toLowerCase()) ||
              c.name.official.toLowerCase().includes(search.toLowerCase())
          );

    if (filteredCountries.length === 1) {
      setCountry(filteredCountries[0]);
    }

    setFilteredCountries(filteredCountries);
  }, [search, countries]);

  if (!filteredCountries || filteredCountries.length < 1)
    return <h1> no mathing </h1>;
  if (filteredCountries.length >= 10) return <h1> too many countries </h1>;

  return country ? (
    <CountryDetails search={search} country={country} />
  ) : (
    <CountriesList countries={filteredCountries} setCountry={setCountry} />
  );
};

export default Countries;
