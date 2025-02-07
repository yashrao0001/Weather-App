import sunRiseLogo from "../assets/sunrise.jpg";
import sunSetLogo from "../assets/sunset.jpg";
import clearSky from "../assets/clear.png";
import snow from "../assets/snow.png";
import rain from "../assets/rain.png";
import drizzle from "../assets/drizzle.png";
import cloud from "../assets/cloud.png";
import mist from "../assets/mist.webp";

import "./DayNight.css";

export default function DayNight({ info }) {
  if (!info) {
    return <p>...Loading</p>;
  }
  const allIcons = {
    "01d": clearSky,
    "01n": clearSky,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": cloud,
    "11n": cloud,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };
  const icon = allIcons[info.icon];
  const convertTimeStamp = (num) => {
    const time = new Date(num * 1000);
    return time.toLocaleTimeString();
  };
  return (
    <div className="container">
      <div className="tempBox">
        <img src={icon} alt="clear_Sky" />
        <p className="temp">{info.temperature}&deg;C</p>
        <span>
          {info.minTemp}&deg;/{info.maxTemp}&deg; &nbsp;&nbsp;&nbsp;Feels
          like&nbsp;
          {info.feelsLike}
          &deg;C
        </span>
        <p>
          <span className="material-symbols-outlined">location_on</span>&nbsp;
          {info.city}, {info.country}
        </p>
      </div>
      <br />
      <br />
      <div className="sunTimeBox">
        <div className="sunrise">
          <p>Sunrise</p>
          <img src={sunRiseLogo} alt="sunRiseLogo" />
          <p>{convertTimeStamp(info.sunRise)}</p>
        </div>
        <div className="sunset">
          <p>Sunset</p>
          <img src={sunSetLogo} alt="sunSetLogo" />
          <p>{convertTimeStamp(info.sunSet)} </p>
        </div>
      </div>
    </div>
  );
}
