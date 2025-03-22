import React from "react";
import "../Style/HourlyForecast.css";
import ReactAnimatedWeather from "react-animated-weather";

export default function HourlyForecast({
  hourlyForecast,
  is24Hour,
  unit,
  weatherIcons,
}) {
  return (
    <div className="hourly-container">
      <h6>Hourly Forecast</h6>
      {hourlyForecast.length > 0 ? (
        <div className="hourly-forecast">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="hour">
              <p>
                {new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: !is24Hour,
                })}
              </p>
              <ReactAnimatedWeather
                icon={weatherIcons[hour.weather?.[0]?.main] || "CLOUDY"}
                color="#757882"
                size={40}
                animate={true}
              />
              <p>
                {Math.round(hour.main.temp)}
                {unit === "metric" ? "°C" : "°F"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading hourly forecast...</p>
      )}
    </div>
  );
}
