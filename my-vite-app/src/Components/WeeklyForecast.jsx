import React from "react";
import "../Style/Forecast.css";
import ReactAnimatedWeather from "react-animated-weather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureEmpty,
  faTemperatureThreeQuarters,
} from "@fortawesome/free-solid-svg-icons";



const sheCodesToAnimatedWeather = {
  "broken-clouds-day": "CLOUDY",
  "broken-clouds-night": "CLOUDY",
  "clear-sky-day": "CLEAR_DAY",
  "clear-sky-night": "CLEAR_NIGHT",
  "few-clouds-day": "PARTLY_CLOUDY_DAY",
  "few-clouds-night": "PARTLY_CLOUDY_NIGHT",
  "mist-day": "FOG",
  "mist-night": "FOG",
  "rain-day": "RAIN",
  "rain-night": "RAIN",
  "scattered-clouds-day": "CLOUDY",
  "scattered-clouds-night": "CLOUDY",
  "shower-rain-day": "RAIN",
  "shower-rain-night": "RAIN",
  "snow-day": "SNOW",
  "snow-night": "SNOW",
  "thunderstorm-day": "WIND",
  "thunderstorm-night": "WIND",
};
export default function WeeklyForecast({ dailyForecast, unit }) {
  return (
    <div className="hourly-container">
      <h6 className="title">5-Day Forecast</h6>
      {dailyForecast.length > 0 ? (
        <div className="hourly-forecast">
          {dailyForecast.slice(1, 6).map((day, index) => (
            <div key={index} className="hour">
              <p>
                {new Date(day.time * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <ReactAnimatedWeather
                icon={sheCodesToAnimatedWeather[day.condition.icon] || "CLOUDY"}
                color="#757882"
                size={40}
                animate={true}
              />
              <p style={{ fontSize: "14px" }}>
                <FontAwesomeIcon
                  icon={faTemperatureEmpty}
                  style={{ color: "blue", marginRight: "4px" }}
                />
                {Math.round(day.temperature.minimum)}°
                {unit === "metric" ? "C" : "F"}
                <br />
                <FontAwesomeIcon
                  icon={faTemperatureThreeQuarters}
                  style={{ color: "red", marginRight: "4px" }}
                />
                {Math.round(day.temperature.maximum)}°
                {unit === "metric" ? "C" : "F"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading weekly forecast...</p>
      )}
    </div>
  );
}
