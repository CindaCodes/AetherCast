const fetchWeather = async (city, unit = "metric") => {
  const apiKey = process.env.REACT_APP_MY_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found or API error");
    }
    const data = await response.json();
    console.log("Weather data:", data);
    return data; // <--- Important so the calling component can use it
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // <--- Also rethrow it for handling in the UI
  }
};

export default fetchWeather;
