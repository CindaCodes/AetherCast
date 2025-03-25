import axios from "axios";

const fetchAllWeather = async ({
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

export default fetchAllWeather;
