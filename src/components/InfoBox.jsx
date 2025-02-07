import "./InfoBox.css";
import humidityPic from "../assets/humiditypng.webp";
import windPic from "../assets/wind.webp";
import visibilityIcon from "../assets/visibility.png";
import MapComponent from "../components/MapComponent";

export default function InfoBox({ weatherData, location }) {
  if (!weatherData) {
    return <p>No weather data available. Please search for a city.</p>;
  }

  return (
    <div className="InfoBox">
      <MapComponent latitude={location.lat} longitude={location.lon} />

      <div className="widgets">
        <div className="box">
          <img src={humidityPic} alt="humidity_icon" />
          <br />
          <p>Humidity</p>
          <p> {weatherData.humidity}% </p>
        </div>
        <div className="box">
          <img src={windPic} alt="windPic" />
          <br />
          <p>Wind</p>
          <p> {weatherData.windSpeed}km/hr </p>
        </div>
        <div className="box visibility">
          <img src={visibilityIcon} alt="visibility_Icon" />
          <br />
          <p>Wind</p>
          <p> {weatherData.visibility}km </p>
        </div>
      </div>
    </div>
  );
}
