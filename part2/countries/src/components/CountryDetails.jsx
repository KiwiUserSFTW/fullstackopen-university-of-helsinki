// react
import { useEffect, useState } from "react";

// api
import weatherService from "../services/weather";

const CountryDetails = ({ country }) => {
  const [countryWeather, setCountryWeather] = useState(null);

  useEffect(() => {
    weatherService.getWeatherByCountryName(country.capital).then((weather) => {
      console.log(weather);
      setCountryWeather(weather);
    });
  }, [country]);

  return (
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

      {!countryWeather ? (
        <> loading ...</>
      ) : (
        <>
          <h1> Weather in {country.capital}</h1>
          <p> Temperature {countryWeather.main.temp} Celsius </p>
          <img
            src={`https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`}
          />
          <p> Wind {countryWeather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default CountryDetails;
