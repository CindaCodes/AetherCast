import React from "react";
import ThemeToggle from "./ThemeToggle";
import Form from "./Form";
import ReactAnimatedWeather from "react-animated-weather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureEmpty,
  faTemperatureThreeQuarters,
} from "@fortawesome/free-solid-svg-icons";

export default function MainWeatherBox({
  dailyForecast,
  is24Hour,
  lastUpdated,
  setCity,
  setCitySearched,
  setIs24Hour,
  setUnit,
  unit,
  weatherData,
  weatherIcons,
}) {
  const todayForecast = dailyForecast?.[0];
  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center text-center gap-2 mb-2">
        <div>
          <ThemeToggle />
        </div>
        <div className="d-flex gap-2">
          <button
            onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
          >
            {unit === "metric" ? "Switch to °F" : "Switch to °C"}
          </button>
          <button
            className="toggle-button"
            onClick={() => setIs24Hour(!is24Hour)}
          >
            {is24Hour ? "12-Hour" : "24-Hour"}
          </button>
        </div>
      </div>

      <div className="mb-2">
        <Form
          onSearch={(newCity) => {
            setCity(newCity);
            setCitySearched(true);
          }}
        />
      </div>

      <div className="d-flex justify-content-evenly">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <ReactAnimatedWeather
            icon={weatherIcons[weatherData.weather[0].main] || "CLOUDY"}
            color="#757882"
            size={120}
            animate={true}
          />
          <h6 className="label text-start">
            {weatherData.weather[0].description}
          </h6>
        </div>
        <div>
          <div className="display-3 text-start">
            {Math.round(weatherData.main.temp)}
            {unit === "metric" ? "°C" : "°F"}
          </div>
          <p className="label text-start">
            Feels like: {Math.round(weatherData.main.feels_like)}
            {unit === "metric" ? "°C" : "°F"}
          </p>
          <div className="label text-start d-flex justify-content-between">
            <div>
              <FontAwesomeIcon
                icon={faTemperatureThreeQuarters}
                style={{ color: "red", marginRight: "4px" }}
              />
              {Math.round(todayForecast?.temperature.maximum)}
              {unit === "metric" ? "°C" : "°F"}
            </div>
            <div>
              <FontAwesomeIcon
                icon={faTemperatureEmpty}
                style={{ color: "blue", marginRight: "4px" }}
              />
              {Math.round(todayForecast?.temperature.minimum)}
              {unit === "metric" ? "°C" : "°F"}
            </div>
          </div>
        </div>
      </div>

      <div className="label mt-5 d-flex flex-wrap justify-content-center text-center">
        <div className="me-2">Updated:</div>
        <div>
          {lastUpdated.toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: !is24Hour,
          })}
        </div>
      </div>
    </>
  );
}
