// react
import { useState, useEffect } from "react";

// api
import countriesService from "./services/countries";

// styling
import "./App.css";

// components
import Countries from "./components/Countries";

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
