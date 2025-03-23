import React from "react";
<<<<<<< HEAD
import "../Style/Forecast.css";
=======
import "../Style/HourlyForecast.css";
>>>>>>> 45348f9718874543c2e97ff8948be1279c326403
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
<<<<<<< HEAD
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

=======
              <p>
                {new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: !is24Hour,
                })}
              </p>
>>>>>>> 45348f9718874543c2e97ff8948be1279c326403
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
