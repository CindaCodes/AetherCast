import React from "react";
import ThemeToggle from "./ThemeToggle";
import Form from "./Form";
import ReactAnimatedWeather from "react-animated-weather";

export default function MainWeatherBox({
  weatherData,
  unit,
  is24Hour,
  setUnit,
  setIs24Hour,
  setCity,
  setCitySearched,
  weatherIcons,
  lastUpdated,
}) {
  return (
    <>
      <div className="d-flex gap-2 align-items-center justify-content-center flex-wrap">
        <ThemeToggle />
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

      <div className="mb-3">
        <Form
          onSearch={(newCity) => {
            setCity(newCity);
            setCitySearched(true);
          }}
        />
      </div>

      <ReactAnimatedWeather
        icon={weatherIcons[weatherData.weather[0].main] || "CLOUDY"}
        color="#757882"
        size={130}
        animate={true}
      />
      <h6>{weatherData.weather[0].description}</h6>
      <h4>
        Temperature:{" "}
        {weatherData.main.temp ? Math.round(weatherData.main.temp) : "--"}
        {unit === "metric" ? "°C" : "°F"}
      </h4>
      {lastUpdated && (
        <div className="advice">
          Updated:{" "}
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
      )}
    </>
  );
}
