import "../Style/Weather.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Circles } from "react-loader-spinner";
import { useWeather } from "./FetchWeather"; 

import AirQuality from "./AirQuality";
import Footer from "./Footer";
import HourlyForecast from "./HourlyForecast";
import Humidity from "./Humidity";
import MainWeather from "./MainWeather";
import Pressure from "./Pressure";
import RainChart from "./RainChart";
import SunCycle from "./SunCycle";
import UVIndex from "./UVIndex";
import VisibilityGauge from "./Visibility";
import WeeklyForecast from "./WeeklyForecast";
import WindCompass from "./WindCompass";

export default function Weather() {
  const [city, setCity] = useState("Oslo");
  const [citySearched, setCitySearched] = useState(false);
  const [is24Hour, setIs24Hour] = useState(false);
  const [unit, setUnit] = useState("metric");

  const {
    airQuality,
    dailyForecast,
    hourlyForecast,
    lastUpdated,
    weatherData,
    coords,
    usedGeolocation,
  } = useWeather(city, unit, is24Hour, citySearched, setCitySearched);

  const weatherIcons = {
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Drizzle: "SLEET",
    Mist: "FOG",
    Rain: "RAIN",
    Snow: "SNOW",
    Thunderstorm: "WIND",
  };

  if (!weatherData || !weatherData.coord) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Circles
          height="100"
          width="100"
          color="#3f5468"
          ariaLabel="loading"
          visible
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
