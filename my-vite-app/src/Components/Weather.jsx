import "../Style/Weather.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import AirQuality from "./AirQuality";
import axios from "axios";
import Footer from "./Footer";
import Form from "./Form";
import HourlyForecast from "./HourlyForecast";
import Humidity from "./Humidity";
import Pressure from "./Pressure";
import RainChart from "./RainChart";
import ReactAnimatedWeather from "react-animated-weather";
import SunCycle from "./SunCycle";
import ThemeToggle from "./ThemeToggle";
import UVIndex from "./UVIndex";
import VisibilityGauge from "./Visibility";
import WeeklyForecast from "./WeeklyForecast";
import WindCompass from "./WindCompass";
import { Circles } from "react-loader-spinner";

export default function Weather() {
  const [airQuality, setAirQuality] = useState(null);
  const [city, setCity] = useState("Oslo");
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [is24Hour, setIs24Hour] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [weatherData, setWeatherData] = useState(null);
  const [coords, setCoords] = useState(null);
  const [usedGeolocation, setUsedGeolocation] = useState(true);
  const [citySearched, setCitySearched] = useState(false);
  const hasMounted = useRef(false);

  const apiKey = import.meta.env.VITE_API_KEY;
  const sheCodesApiKey = import.meta.env.VITE_SC_API_KEY;

  const weatherIcons = {
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Drizzle: "SLEET",
    Mist: "FOG",
    Rain: "RAIN",
    Snow: "SNOW",
    Thunderstorm: "WIND",
  };

  const fetchWeather = async (lat, lon, resolvedCity = null) => {
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
      const response = await axios.get(weatherUrl);
      setWeatherData(response.data);

      if (!resolvedCity) {
        setCity(response.data.name);
      }

      const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const airResponse = await axios.get(airQualityUrl);
      setAirQuality(airResponse.data.list[0]);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
      const forecastResponse = await axios.get(forecastUrl);
      setHourlyForecast(forecastResponse.data.list.slice(0, 7));

      const shecodesUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${sheCodesApiKey}&units=${unit}`;
      const shecodesResponse = await axios.get(shecodesUrl);
      setDailyForecast(shecodesResponse.data.daily.slice(0, 6));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    const resolveCityToCoords = async () => {
      try {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const geoResponse = await axios.get(geoUrl);
        if (geoResponse.data.length === 0) {
          console.error("City not found");
          return;
        }
        const { lat, lon } = geoResponse.data[0];
        setCoords({ lat, lon });
        setUsedGeolocation(false);
      } catch (error) {
        console.error("Error resolving city:", error);
      }
    };

    if (!hasMounted.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
          setUsedGeolocation(true);
          hasMounted.current = true;
        },
        () => {
          resolveCityToCoords();
          setUsedGeolocation(false);
          hasMounted.current = true;
        }
      );
    } else if (citySearched) {
      resolveCityToCoords();
      setCitySearched(false);
    }
  }, [city]);

  useEffect(() => {
    if (coords) {
      fetchWeather(coords.lat, coords.lon, usedGeolocation ? null : city);
    }
  }, [coords, unit, is24Hour]);

  if (!weatherData || !weatherData.coord) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Circles
          height="100"
          width="100"
          color="#3f5468"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="Weather">
      <div
        className="header-box display-4 mb-4 text-center"
        style={{ gridArea: "header-2" }}
      >
        {weatherData.name}
      </div>

      <div className="grid-container">
        <div className="box" style={{ gridArea: "box-1" }}>
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
            unit={unit}
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

        <div className="rectangular-box" style={{ gridArea: "box-8" }}>
          <WeeklyForecast dailyForecast={dailyForecast} unit={unit} />
        </div>

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

        <div className="rectangular-box" style={{ gridArea: "box-11" }}>
          <h6 className="title">☔️ Chance of Rain</h6>
          <RainChart hourlyForecast={hourlyForecast} is24Hour={is24Hour} />
        </div>

        <div className="rectangular-box" style={{ gridArea: "footer" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
