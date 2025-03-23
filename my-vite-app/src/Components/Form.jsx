import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Form({ onSearch }) {
  const [cityInput, setCityInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim() !== "") {
      onSearch(cityInput.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a city..."
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
<<<<<<< HEAD
        className="weather-input"
=======
        class="weather-input"
>>>>>>> 45348f9718874543c2e97ff8948be1279c326403
      />
      <button type="submit">Search</button>
    </form>
  );
}
