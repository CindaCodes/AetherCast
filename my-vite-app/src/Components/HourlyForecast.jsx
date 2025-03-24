import React from "react";
import "../Style/Forecast.css";
import ReactAnimatedWeather from "react-animated-weather";

export default function HourlyForecast({
  hourlyForecast,
  is24Hour,
  unit,
  weatherIcons,
}) {
  return (
    <div className="hourly-container">
      <h6 className="title">Hourly Forecast</h6>
      {hourlyForecast.length > 0 ? (
        <div className="hourly-forecast">
          {hourlyForecast.slice(0, 5).map((hour, index) => (
            <div key={index} className="hour">
              <p>
                {Math.round(hour.main.temp)}
                {unit === "metric" ? "°C" : "°F"}
              </p>

              <ReactAnimatedWeather
                icon={weatherIcons[hour.weather?.[0]?.main] || "CLOUDY"}
                color="#757882"
                size={40}
                animate={true}
              />
              <p className="hour-time">
                {new Date(hour.dt * 1000)
                  .toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: !is24Hour,
                  })
                  .replace(/ (AM|PM)/, "")}
                {!is24Hour && (
                  <>
                    <br />
                    <span className="ampm">
                      {
                        new Date(hour.dt * 1000)
                          .toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                          .match(/(AM|PM)/)?.[0]
                      }
                    </span>
                  </>
                )}
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
