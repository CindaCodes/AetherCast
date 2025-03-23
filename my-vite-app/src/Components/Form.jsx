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
        className="weather-input"
      />
      <button type="submit">Search</button>
    </form>
  );
}
