import React from "react";
import ReactAnimatedWeather from "react-animated-weather";
import "../Style/Pressure.css";

const Pressure = ({ pressure }) => {
  const minPressure = 970;
  const maxPressure = 1040;
  const normalized = Math.min(
    Math.max((pressure - minPressure) / (maxPressure - minPressure), 0),
    1
  );
  const rotation = normalized * 180 - 90;


  let icon = "CLOUDY";
  if (pressure > 1020) icon = "CLEAR_DAY";
  else if (pressure < 990) icon = "RAIN";

  let label = "Cloudy";
  if (pressure > 1020) label = "Sunny";
  else if (pressure < 990) label = "Rainy";

  return (
    <div className="pressure-container">
      <div className="pressure-label">Pressure</div>
      <div className="pressure-gauge">
        <div
          className="pressure-needle"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <div className="pressure-icon-center">
          <ReactAnimatedWeather icon={icon} color="#fff" size={36} animate />
        </div>
        <div className="center-dot"></div>
        <div className="dir n">1010</div>
        <div className="dir e">1300</div>
        <div className="dir s">970</div>
        <div className="dir w">990</div>
      </div>
      <div className="pressure-value">{pressure} hPa</div>
    </div>
  );
};

export default Pressure;
