import "../Style/Weather.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import AirQuality from "./AirQuality";
import axios from "axios";
import Footer from "./Footer";
import Form from "./Form";
import Humidity from "./Humidity";
import Pressure from "./Pressure";
import RainChart from "./RainChart";
import ReactAnimatedWeather from "react-animated-weather";
import SunCycle from "./SunCycle";
import ThemeToggle from "./ThemeToggle";
import UVIndex from "./UVIndex";
import VisibilityGauge from "./Visibility";
import WindCompass from "./WindCompass";
import HourlyForecast from "./HourlyForecast";


export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [is24Hour, setIs24Hour] = useState(false);
  const [airQuality, setAirQuality] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [unit, setUnit] = useState("metric");

  const [city, setCity] = useState("Denver"); // ✅ move this here

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
    const fetchWeather = async (lat, lon) => {
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
        const response = await axios.get(weatherUrl);
        setWeatherData(response.data);

        const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const airResponse = await axios.get(airQualityUrl);
        setAirQuality(airResponse.data.list[0]);

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
        const forecastResponse = await axios.get(forecastUrl);
        setHourlyForecast(forecastResponse.data.list.slice(0, 7));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => {
        // fallback to default city if location denied
        const defaultLat = 39.7392; // Denver
        const defaultLon = -104.9903;
        fetchWeather(defaultLat, defaultLon);
      }
    );
  }, [unit, is24Hour]);

  if (!weatherData || !weatherData.coord) return <div>Loading...</div>;

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
          <Form onSearch={setCity} />
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
          <button
            className="toggle-button"
            onClick={() => setIs24Hour(!is24Hour)}
          >
            {is24Hour ? "12-Hour" : "24-Hour"}
          </button>
        </div>
        <div className="rectangular-box" style={{ gridArea: "box-2" }}>
          <AirQuality aqi={airQuality?.main?.aqi || 1} />
        </div>

        <div className="box" style={{ gridArea: "box-3" }}>
          <Pressure pressure={weatherData.main.pressure} />
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
          <Humidity humidity={weatherData.main.humidity} />
        </div>
        <div className="box" style={{ gridArea: "box-7" }}>
          <SunCycle
            sunrise={weatherData.sys.sunrise}
            sunset={weatherData.sys.sunset}
            currentTime={Date.now()}
          />
        </div>
        <div className="box" style={{ gridArea: "box-8" }}></div>
        <div className="rectangular-box" style={{ gridArea: "box-9" }}>
          <HourlyForecast
            hourlyForecast={hourlyForecast}
            is24Hour={is24Hour}
            unit={unit}
            weatherIcons={weatherIcons}
          />
        </div>

        <div className="box" style={{ gridArea: "box-10" }}>
          <VisibilityGauge visibility={weatherData.visibility} />
        </div>
        <div className="box" style={{ gridArea: "box-11" }}></div>

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
