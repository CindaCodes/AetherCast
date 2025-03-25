import "../Style/Weather.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import { Circles } from "react-loader-spinner";
import AirQuality from "./AirQuality";
import axios from "axios";
import fetchAllWeather from "./FetchWeather";
import Footer from "./Footer";
import Form from "./Form";
import HourlyForecast from "./HourlyForecast";
import Humidity from "./Humidity";
import MainWeather from "./MainWeather";
import Pressure from "./Pressure";
import RainChart from "./RainChart";
import ReactAnimatedWeather from "react-animated-weather";
import SunCycle from "./SunCycle";
import ThemeToggle from "./ThemeToggle";
import UVIndex from "./UVIndex";
import VisibilityGauge from "./Visibility";
import WeeklyForecast from "./WeeklyForecast";
import WindCompass from "./WindCompass";

export default function Weather() {
  const [airQuality, setAirQuality] = useState(null);
  const [city, setCity] = useState("Oslo");
  const [citySearched, setCitySearched] = useState(false);
  const [coords, setCoords] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [is24Hour, setIs24Hour] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [usedGeolocation, setUsedGeolocation] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
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
      const result = await fetchAllWeather({
        apiKey,
        city,
        lat,
        lon,
        sheCodesApiKey,
        unit,
      });

      setAirQuality(result.airQuality);
      setDailyForecast(result.dailyForecast);
      setHourlyForecast(result.hourlyForecast);
      setWeatherData(result.weather);
      setLastUpdated(new Date());

      if (!resolvedCity) {
        setCity(result.weather.name);
      }
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
          <MainWeather
            dailyForecast={dailyForecast}
            is24Hour={is24Hour}
            lastUpdated={lastUpdated}
            setCity={setCity}
            setCitySearched={setCitySearched}
            setIs24Hour={setIs24Hour}
            setUnit={setUnit}
            unit={unit}
            weatherData={weatherData}
            weatherIcons={weatherIcons}
          />
        </div>

        <div className="rectangular-box" style={{ gridArea: "box-2" }}>
          <AirQuality aqi={airQuality?.main?.aqi || 1} />
        </div>

        <div className="box" style={{ gridArea: "box-3" }}>
          <Pressure pressure={weatherData.main.pressure} />
        </div>

        <div className="box" style={{ gridArea: "box-4" }}>
          <WindCompass
            unit={unit}
            windDeg={weatherData.wind.deg}
            windSpeed={weatherData.wind.speed}
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
            is24Hour={is24Hour}
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
