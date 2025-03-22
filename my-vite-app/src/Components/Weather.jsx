import { useEffect, useState } from "react";
import Footer from "./Footer";
import Form from "./Form";
import ThemeToggle from "./ThemeToggle";
import "../Style/Weather.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import Humidity from "./Humidity";
import RainChart from "./RainChart";
import WindCompass from "./WindCompass";
import UVIndex from "./UVIndex";
import AirQuality from "./AirQuality";
import Pressure from "./Pressure";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [is24Hour, setIs24Hour] = useState(false);
  const [airQuality, setAirQuality] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [unit, setUnit] = useState("metric");
  const weatherIcons = {
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Rain: "RAIN",
    Snow: "SNOW",
    Thunderstorm: "WIND",
    Drizzle: "SLEET",
    Mist: "FOG",
  };

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Oslo",
    hour12: !is24Hour,
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const city = "Oslo";
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

      try {
        const response = await axios.get(weatherUrl);
        setWeatherData(response.data);

        // ✅ Get Latitude & Longitude for Air Quality
        const { lat, lon } = response.data.coord;
        const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        // ✅ Fetch Air Quality Data Correctly
        const airResponse = await axios.get(airQualityUrl);
        setAirQuality(airResponse.data.list[0]);

        // ✅ Fetch Hourly Forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
        const forecastResponse = await axios.get(forecastUrl);
        setHourlyForecast(forecastResponse.data.list.slice(0, 7));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWeather();
  }, [unit, is24Hour]);

  if (!weatherData || !weatherData.coord) return <div>Loading...</div>;

  const sunriseTime = new Date(
    weatherData.sys.sunrise * 1000
  ).toLocaleTimeString("en-US", options);
  const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
    "en-US",
    options
  );

  return (
    <div className="Weather">
      {/* 🌟 Main Grid Layout */}
      <div className="grid-container">
        <div className="header-box " style={{ gridArea: "header-1" }}>
          <ThemeToggle />
        </div>
        <div
          className="header-box display-4 text-center"
          style={{ gridArea: "header-2" }}
        >
          {weatherData.name}
        </div>
        <div className="header-box" style={{ gridArea: "header-3" }}>
          <Form />
        </div>
        <div className="box" style={{ gridArea: "box-1" }}>
          <ReactAnimatedWeather
            icon={weatherIcons[weatherData.weather[0].main] || "CLOUDY"}
            color="#757882"
            size={164}
            animate={true}
          />

          <h6>{weatherData.weather[0].description}</h6>
          <h4>
            Temperature:{" "}
            {weatherData.main.temp ? Math.round(weatherData.main.temp) : "--"}
            {unit === "metric" ? "°C" : "°F"}
          </h4>

          <button
            onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
          >
            {unit === "metric" ? "Switch to °F" : "Switch to °C"}
          </button>
        </div>
        <div className="rectangular-box" style={{ gridArea: "box-2" }}>
          <AirQuality aqi={airQuality?.main?.aqi || 1} />
        </div>

        <div className="box" style={{ gridArea: "box-3" }}>
          <p>Sunrise: {sunriseTime}</p>
          <p>Sunset: {sunsetTime}</p>

          <button
            className="toggle-button"
            onClick={() => setIs24Hour(!is24Hour)}
          >
            {is24Hour ? "12-Hour" : "24-Hour"}
          </button>
        </div>
        <div className="box" style={{ gridArea: "box-4" }}>
          <WindCompass
            windSpeed={weatherData.wind.speed}
            windDeg={weatherData.wind.deg}
          />
        </div>

        <div className="box" style={{ gridArea: "box-5" }}>
          <UVIndex uv={weatherData.uvi || 3} />
        </div>
        <div className="box" style={{ gridArea: "box-6" }}>
          Precipitation
        </div>
        <div className="box" style={{ gridArea: "box-7" }}>
          Feels Like
        </div>
        <div className="box" style={{ gridArea: "box-8" }}>
          <h5>Humidity</h5>
          <Humidity humidity={weatherData.main.humidity} />
        </div>
        <div className="rectangular-box" style={{ gridArea: "box-9" }}>
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

        <div className="box" style={{ gridArea: "box-10" }}>
          Visibility
        </div>
        <div className="box" style={{ gridArea: "box-11" }}>
          <Pressure pressure={weatherData.main.pressure} />
        </div>

        <div className="rectangular-box" style={{ gridArea: "box-12" }}>
          <h6>Chance of Rain</h6>
          <RainChart hourlyForecast={hourlyForecast} is24Hour={is24Hour} />
        </div>

        <div className="box" style={{ gridArea: "footer" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
