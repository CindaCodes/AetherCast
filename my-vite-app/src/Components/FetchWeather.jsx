import { useEffect, useRef, useState } from "react";
import axios from "axios";

export function useWeather(
  city,
  unit,
  is24Hour,
  citySearched,
  setCitySearched
) {
  const [airQuality, setAirQuality] = useState(null);
  const [coords, setCoords] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [usedGeolocation, setUsedGeolocation] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const hasMounted = useRef(false);

  const apiKey = import.meta.env.VITE_API_KEY;
  const sheCodesApiKey = import.meta.env.VITE_SC_API_KEY;

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
        // Optionally: setCity(result.weather.name);
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

  return {
    airQuality,
    dailyForecast,
    hourlyForecast,
    lastUpdated,
    weatherData,
    coords,
    usedGeolocation,
  };
}

export const fetchAllWeather = async ({
  apiKey,
  lat,
  lon,
  sheCodesApiKey,
  unit,
}) => {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    const weatherResponse = await axios.get(weatherUrl);

    const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const airResponse = await axios.get(airQualityUrl);

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    const forecastResponse = await axios.get(forecastUrl);

    const shecodesUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${sheCodesApiKey}&units=${unit}`;
    const shecodesResponse = await axios.get(shecodesUrl);

    return {
      airQuality: airResponse.data.list[0],
      dailyForecast: shecodesResponse.data.daily.slice(0, 6),
      hourlyForecast: forecastResponse.data.list.slice(0, 7),
      weather: weatherResponse.data,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
