import { getLocation } from "./getLocation";
let apiURL = import.meta.env.VITE_API_URL;
let apiKEY = import.meta.env.VITE_API_KEY;
let locationCoordinates = null;

const fetchLocation = async () => {
  try {
    const userLocation = await getLocation();
    locationCoordinates = userLocation;
  } catch (err) {
    console.error("Error fetching location:", err);
    locationCoordinates = { lat: 0, lon: 0 };
  }
};

//Get Weather data
async function getWeather(city) {
  try {
    await fetchLocation();
    let jsonResponse;
    if (city) {
      // Fetch weather for entered city
      jsonResponse = await fetch(
        `${apiURL}q=${city}&appid=${apiKEY}&units=metric`
      );
    } else if (locationCoordinates) {
      // Fetch weather based on location when the app loads
      jsonResponse = await fetch(
        `${apiURL}lat=${locationCoordinates.lat}&lon=${locationCoordinates.lon}&appid=${apiKEY}&units=metric`
      );
    }
    if (!jsonResponse.ok) {
      let errorMessage = city
        ? " Enter valid city name!"
        : "Error fetching weather data";
      throw new Error(errorMessage);
    }

    let response = await jsonResponse.json();
    let data = {
      city: response.name,
      country: response.sys.country,
      temperature: Math.floor(response.main.temp),
      humidity: response.main.humidity,
      visibility: response.visibility,
      windSpeed: Math.floor(response.wind.speed),
      description: response.weather[0].description,
      icon: response.weather[0].icon || "01d",
      minTemp: Math.floor(response.main.temp_min),
      maxTemp: Math.floor(response.main.temp_max),
      feelsLike: Math.floor(response.main.feels_like),
      sunRise: response.sys.sunrise,
      sunSet: response.sys.sunset,
      visibility: response.visibility / 1000,
    };
    return data;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
}
export { getWeather, locationCoordinates };
