import { useState, useEffect } from "react";
import SearchBox from "./SearchBox.jsx";
import InfoBox from "./InfoBox.jsx";
import { getWeather } from "../services/getWeather.js";
import DateTimeBox from "./DateTimeBox.jsx";
import DayNight from "./DayNight.jsx";
import { locationCoordinates } from "../services/getWeather";
import { searchCity } from "../services/getLocation.js";
import ErrorPage from "./ErrorPage.jsx";

export default function WeatherApp() {
  let [city, setCity] = useState("");
  let [cityCoordinates, setCityCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [err, setErr] = useState(null);

  let handleInput = (event) => {
    setCity(event.target.value);
  };
  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = await getWeather(city);
      if (data.error) {
        setErr(data.error);
        setWeatherData(null);
        return;
      } else {
        setWeatherData(data);
        setErr(null);
        let coordinates = await searchCity(city);
        setCityCoordinates(coordinates);
      }
    } catch (error) {
      setErr("Could not fetch weather data. Please try again.");
    } finally {
      setCity("");
    }
  };
  // Fetch weather based on location initially
  useEffect(() => {
    const fetchLocationWeather = async () => {
      const data = await getWeather(); // No city passed, uses location
      if (data.error) {
        setErr(data.error);
        setWeatherData(null);
        return;
      }
      setWeatherData(data);
    };

    fetchLocationWeather();
  }, []);

  return (
    <>
      {err ? (
        <ErrorPage errMsg={err} />
      ) : (
        <>
          <SearchBox
            city={city}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
          />
          <DayNight info={weatherData} />
          {cityCoordinates ? (
            <InfoBox weatherData={weatherData} location={cityCoordinates} />
          ) : (
            <InfoBox weatherData={weatherData} location={locationCoordinates} />
          )}
          <div className="hidden"></div>

          <DateTimeBox weather={weatherData} />
        </>
      )}
    </>
  );
}
