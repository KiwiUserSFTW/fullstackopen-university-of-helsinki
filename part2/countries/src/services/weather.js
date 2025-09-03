// api
import axios from "axios";

// env
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// variable api_key now has the value set in startup
const getData = (promiseAction) =>
  promiseAction.then((response) => response.data);

const getWeatherByCountryName = (countryName) =>
  getData(
    axios.get(`${baseUrl}?q=${countryName}&appid=${apiKey}&units=metric`)
  );

export default { getWeatherByCountryName };
